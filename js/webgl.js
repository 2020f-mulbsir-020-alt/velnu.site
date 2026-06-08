/**
 * Velnu — WebGL Cosmic Effects
 */
Velnu.webgl = (function () {
  'use strict';

  const { utils } = Velnu;

  const vertexShaderSource = `
    attribute vec2 a_position;
    varying vec2 v_uv;
    void main() {
      v_uv = a_position * 0.5 + 0.5;
      gl_Position = vec4(a_position, 0.0, 1.0);
    }
  `;

  const fragmentShaderSource = `
    precision mediump float;
    varying vec2 v_uv;
    uniform float u_time;
    uniform vec2 u_resolution;

    float hash(vec2 p) {
      return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
    }

    float noise(vec2 p) {
      vec2 i = floor(p);
      vec2 f = fract(p);
      f = f * f * (3.0 - 2.0 * f);
      float a = hash(i);
      float b = hash(i + vec2(1.0, 0.0));
      float c = hash(i + vec2(0.0, 1.0));
      float d = hash(i + vec2(1.0, 1.0));
      return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
    }

    void main() {
      vec2 uv = v_uv;
      vec2 p = (uv - 0.5) * vec2(u_resolution.x / u_resolution.y, 1.0);

      float t = u_time * 0.15;
      float n = noise(p * 3.0 + t);
      float n2 = noise(p * 6.0 - t * 0.5);

      vec3 deep = vec3(0.039, 0.047, 0.063);
      vec3 indigo = vec3(0.165, 0.176, 0.290);
      vec3 nebula = vec3(0.165, 0.227, 0.361);
      vec3 gold = vec3(0.706, 0.616, 0.416);

      float neb = smoothstep(0.3, 0.7, n) * smoothstep(0.2, 0.8, n2);
      vec3 col = mix(deep, indigo, neb * 0.5);
      col = mix(col, nebula, neb * 0.4);
      col += gold * pow(neb, 3.0) * 0.15;

      float stars = step(0.995, hash(floor(uv * u_resolution * 0.5)));
      col += vec3(0.96, 0.965, 0.973) * stars * 0.8;

      float vignette = 1.0 - length(p) * 0.8;
      col *= clamp(vignette, 0.2, 1.0);

      gl_FragColor = vec4(col, 1.0);
    }
  `;

  function createShader(gl, type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.warn('Shader compile error:', gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return null;
    }
    return shader;
  }

  function createProgram(gl, vsSource, fsSource) {
    const vs = createShader(gl, gl.VERTEX_SHADER, vsSource);
    const fs = createShader(gl, gl.FRAGMENT_SHADER, fsSource);
    if (!vs || !fs) return null;

    const program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.warn('Program link error:', gl.getProgramInfoLog(program));
      return null;
    }
    return program;
  }

  function initCosmic(canvas) {
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) return null;

    const program = createProgram(gl, vertexShaderSource, fragmentShaderSource);
    if (!program) return null;

    const positions = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    const posLoc = gl.getAttribLocation(program, 'a_position');
    const timeLoc = gl.getUniformLocation(program, 'u_time');
    const resLoc = gl.getUniformLocation(program, 'u_resolution');

    let rafId = null;
    let startTime = performance.now();
    let visible = false;

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
    }

    resize();
    window.addEventListener('resize', resize, { passive: true });

    const observer = new IntersectionObserver(
      entries => { visible = entries[0].isIntersecting; },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    function render() {
      if (visible) {
        gl.useProgram(program);
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.enableVertexAttribArray(posLoc);
        gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);
        gl.uniform1f(timeLoc, (performance.now() - startTime) * 0.001);
        gl.uniform2f(resLoc, canvas.width, canvas.height);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      }
      rafId = requestAnimationFrame(render);
    }

    if (!utils.reducedMotion) render();

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }

  return { initCosmic };
})();
