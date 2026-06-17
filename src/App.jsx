import { useEffect, useMemo, useRef, useState } from 'react';
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconDownload,
  IconExternalLink,
  IconFileText,
  IconMail,
  IconMenu2,
  IconMoon,
  IconSun,
} from '@tabler/icons-react';
import { geoNaturalEarth1, geoPath } from 'd3-geo';
import { feature, mesh } from 'topojson-client';
import world from 'world-atlas/countries-110m.json';

const navItems = [
  ['about', 'about'],
  ['projects', 'projects'],
  ['experience', 'experience'],
  ['blog', 'blog'],
  ['contact', 'contact'],
];

const projects = [
  {
    title: 'HoneyIntel',
    date: '2024 - present',
    subtitle: 'SSH Honeypot',
    desc: 'End-to-end SSH honeypot pipeline built on Cowrie and Oracle Cloud. Parses real attacker sessions, enriches source IPs with AbuseIPDB, Shodan, VirusTotal, and ip-api, extracted behavioral features with HASSH fingerprinting, clusters behavior with HDBSCAN, flags anomalies with Isolation Forest, and supports SOC-style triage through alerts and dashboard-ready outputs.',
    tags: ['Python', 'Cowrie', 'Oracle Cloud', 'HASSH'],
    links: [
      ['view on github', 'https://github.com/Pramith08/HoneyIntel', IconBrandGithub],
      ['website', 'https://github.com/Pramith08/HoneyIntel', IconExternalLink],
    ],
  },
  {
    title: 'Aero Encrypt',
    date: '2021 - 2024',
    subtitle: 'Offline Password Manager',
    desc: 'Offline-first password manager built with Flutter. Uses Firebase for authentication while keeping credential data on-device, encrypted with hybrid AES and RSA encryption, reducing cloud-storage risk by ensuring stored passwords never leave the user device.',
    tags: ['Flutter', 'AES', 'RSA', 'Python'],
    links: [
      ['view on github', 'https://github.com/Pramith08/AeroEncrypt', IconBrandGithub],
      ['research paper', 'https://ieeexplore.ieee.org/document/10046845', IconFileText],
    ],
  },
  {
    title: 'Lung Cancer Detection System',
    date: '2020 - 2024',
    subtitle: 'Medical Imaging Research - IEEE Xplore Publication',
    desc: 'Computer-aided lung cancer detection system using CT scan image processing. Combines Watershed-based segmentation and feature extraction with CNN classification, delivered as a research prototype and published through ICCEBS 2023 on IEEE Xplore.',
    tags: ['Python', 'CNN', 'Watershed Algorithm', 'Medical Imaging', 'Research'],
    links: [['research paper', 'https://ieeexplore.ieee.org/document/10448847', IconFileText]],
  },
  {
    title: 'Ezzy Search',
    date: '2020 - 2022',
    subtitle: 'GitHub Repository Discovery App - Streamlit',
    desc: 'Streamlit-based GitHub discovery tool that helps users find, filter, compare, and shortlist repositories using the GitHub REST API. It analyzes repository metadata, README content, activity signals, and beginner-friendliness, then supports side-by-side comparison and Markdown export for saved results.',
    tags: ['Python', 'Streamlit', 'GitHub REST API'],
    links: [
      ['website', 'https://github.com/Pramith08/EzzySearch', IconExternalLink],
      ['view on github', 'https://github.com/Pramith08/EzzySearch', IconBrandGithub],
    ],
  },
];

const experiences = [
  {
    role: 'IBM Research Extern',
    period: 'Jan 2026 - present',
    org: 'IBM Research - via UMass 698DS',
    desc: 'Building an LLM-as-a-Judge evaluation framework for cybersecurity under IBM Research and UMass Amherst mentorship. Created a 162K-question benchmark across threat intelligence, vulnerability analysis, and penetration testing, then evaluated model-judge behavior against human agreement while studying position bias, verbosity bias, and security-domain metric limits.',
    tags: ['LLM Evaluation', 'Cybersecurity AI', 'Benchmarking', 'Threat Intelligence', 'IBM'],
    active: true,
  },
  {
    role: 'Research Paper Publication',
    period: 'ICCEBS 2023',
    org: 'Lung Cancer Detection System',
    desc: 'Co-authored and presented an IEEE Xplore publication on CT-scan-based lung cancer detection. Built the research prototype using Watershed-based segmentation and feature extraction with CNN classification for medical image analysis.',
    tags: ['Publication', 'IEEE Xplore', 'CNN', 'Watershed Algorithm', 'Medical Imaging'],
  },
  {
    role: 'Software Engineering Intern',
    period: 'Mar 2023 - May 2023',
    org: 'Vectra Technosoft Private Limited',
    desc: 'Worked on Linux-based application deployment workflows, containerizing applications with Docker and Podman on Red Hat Linux. Configured virtual networks, administered Linux system services for multi-container environments, and earned RHCSA certification through hands-on systems work.',
    tags: ['Linux', 'Docker', 'Podman', 'Networking', 'RHCSA'],
  },
];

const blogs = [
  {
    title: 'HoneyIntel',
    preview: 'A technical write-up on building and operating an SSH honeypot, enriching attacker data, and turning raw sessions into threat intelligence.',
    tag: 'threat-intel',
  },
  {
    title: 'DNS Cache Poisoning Lab',
    preview: 'A walkthrough of the DNS cache poisoning lab, including attack setup, spoofed responses, BIND9 behavior, and packet-level analysis.',
    tag: 'network-security',
  },
];

const cities = [
  { name: 'San Francisco', lat: 37.8, lon: -122.4 },
  { name: 'Sao Paulo', lat: -23.5, lon: -46.6 },
  { name: 'London', lat: 51.5, lon: -0.1 },
  { name: 'Frankfurt', lat: 50.1, lon: 8.7 },
  { name: 'Lagos', lat: 6.5, lon: 3.4 },
  { name: 'Dubai', lat: 25.2, lon: 55.3 },
  { name: 'Mumbai', lat: 19.1, lon: 72.9 },
  { name: 'Singapore', lat: 1.3, lon: 103.8 },
  { name: 'Beijing', lat: 39.9, lon: 116.4 },
  { name: 'Tokyo', lat: 35.7, lon: 139.7 },
  { name: 'Seoul', lat: 37.6, lon: 127.0 },
  { name: 'Sydney', lat: -33.9, lon: 151.2 },
  { name: 'Mexico City', lat: 19.4, lon: -99.1 },
  { name: 'Cape Town', lat: -33.9, lon: 18.4 },
  { name: 'Buenos Aires', lat: -34.6, lon: -58.4 },
];

const amherst = { name: 'Amherst MA', lat: 42.3, lon: -72.5 };

function cssVar(name) {
  const scope = document.querySelector('[data-theme]') || document.documentElement;
  return getComputedStyle(scope).getPropertyValue(name).trim();
}

function roundedRect(ctx, x, y, w, h, r) {
  const radius = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + w, y, x + w, y + h, radius);
  ctx.arcTo(x + w, y + h, x, y + h, radius);
  ctx.arcTo(x, y + h, x, y, radius);
  ctx.arcTo(x, y, x + w, y, radius);
  ctx.closePath();
}

function rectInHero(hero, el) {
  const heroRect = hero.getBoundingClientRect();
  const rect = el.getBoundingClientRect();
  return {
    x: rect.left - heroRect.left,
    y: rect.top - heroRect.top,
    width: rect.width,
    height: rect.height,
  };
}

function arcControl(from, to) {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const dist = Math.hypot(dx, dy) || 1;
  const bend = Math.min(150, Math.max(38, dist * 0.24));
  return {
    x: (from.x + to.x) / 2 - (dy / dist) * bend,
    y: (from.y + to.y) / 2 + (dx / dist) * bend - 18,
  };
}

function bezierPoint(from, control, to, t) {
  const inv = 1 - t;
  return {
    x: inv * inv * from.x + 2 * inv * t * control.x + t * t * to.x,
    y: inv * inv * from.y + 2 * inv * t * control.y + t * t * to.y,
  };
}

function HeroThreatReveal({ dark }) {
  const heroRef = useRef(null);
  const mapCanvasRef = useRef(null);
  const maskCanvasRef = useRef(null);
  const lensRef = useRef(null);
  const headingRef = useRef(null);
  const taglineRef = useRef(null);
  const actionsRef = useRef(null);
  const photoRef = useRef(null);
  const photoImgRef = useRef(null);
  const animationRef = useRef(0);
  const lensRefState = useRef({ x: 0, y: 0, inside: false, blocked: false });
  const packetsRef = useRef([]);
  const lastSpawnRef = useRef(0);
  const sizeRef = useRef({ width: 1, height: 1, dpr: 1 });
  const layoutRef = useRef({ photo: null, texts: [], tagline: null });
  const visibleRef = useRef(true);

  const mapFeatures = useMemo(() => {
    const land = feature(world, world.objects.land);
    const borders = mesh(world, world.objects.countries, (a, b) => a !== b);
    return { land, borders };
  }, []);

  useEffect(() => {
    const hero = heroRef.current;
    const mapCanvas = mapCanvasRef.current;
    const maskCanvas = maskCanvasRef.current;
    const lens = lensRef.current;
    const heading = headingRef.current;
    const tagline = taglineRef.current;
    const actions = actionsRef.current;
    const photo = photoRef.current;
    const photoImg = photoImgRef.current;
    if (!hero || !mapCanvas || !maskCanvas || !lens || !heading || !tagline || !photo || !photoImg) return undefined;

    const mapCtx = mapCanvas.getContext('2d');
    const maskCtx = maskCanvas.getContext('2d');
    let projection = geoNaturalEarth1();
    let path = geoPath(projection, mapCtx);
    let running = false;
    let resizeFrame = 0;

    function resizeCanvas(canvas, ctx) {
      const { width, height, dpr } = sizeRef.current;
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function resize() {
      const rect = hero.getBoundingClientRect();
      const nextWidth = Math.max(1, Math.round(rect.width));
      const nextHeight = Math.max(1, Math.round(rect.height));
      const nextDpr = Math.min(window.devicePixelRatio || 1, 2);
      if (nextWidth === sizeRef.current.width && nextHeight === sizeRef.current.height && nextDpr === sizeRef.current.dpr) {
        measureLayout();
        return;
      }
      sizeRef.current = {
        width: nextWidth,
        height: nextHeight,
        dpr: nextDpr,
      };
      resizeCanvas(mapCanvas, mapCtx);
      resizeCanvas(maskCanvas, maskCtx);
      const { width, height } = sizeRef.current;
      projection = geoNaturalEarth1().fitExtent(
        [
          [-width * 0.03, height * 0.04],
          [width * 1.03, height * 0.96],
        ],
        { type: 'Sphere' },
      );
      path = geoPath(projection, mapCtx);
      measureLayout();
    }

    function scheduleResize() {
      if (resizeFrame) return;
      resizeFrame = requestAnimationFrame(() => {
        resizeFrame = 0;
        resize();
        drawMap(performance.now());
        drawMask();
      });
    }

    function project(city) {
      const projected = projection([city.lon, city.lat]);
      return projected ? { x: projected[0], y: projected[1] } : { x: 0, y: 0 };
    }

    function measureElement(el) {
      const heroRect = hero.getBoundingClientRect();
      const rect = el.getBoundingClientRect();
      return {
        x: rect.left - heroRect.left,
        y: rect.top - heroRect.top,
        width: rect.width,
        height: rect.height,
      };
    }

    function measureLayout() {
      const photoRect = measureElement(photo);
      const photoStyle = getComputedStyle(photo);
      layoutRef.current.photo = {
        ...photoRect,
        radius: parseFloat(photoStyle.borderRadius) || 14,
      };

      layoutRef.current.texts = Array.from(heading.querySelectorAll('span')).map((span) => {
        const rect = measureElement(span);
        const style = getComputedStyle(span);
        return {
          ...rect,
          text: span.textContent,
          font: `900 ${style.fontSize} ${style.fontFamily}`,
          color: style.color,
        };
      });

      const taglineRect = measureElement(tagline);
      const taglineStyle = getComputedStyle(tagline);
      const fontSize = parseFloat(taglineStyle.fontSize) || 14;
      layoutRef.current.tagline = {
        ...taglineRect,
        text: tagline.textContent,
        font: `${taglineStyle.fontWeight || 400} ${taglineStyle.fontSize} ${taglineStyle.fontFamily}`,
        color: taglineStyle.color,
        lineHeight: parseFloat(taglineStyle.lineHeight) || fontSize * 1.6,
      };
    }

    function drawPhoto() {
      const rect = layoutRef.current.photo;
      if (!rect) return;
      if (rect.width < 1 || rect.height < 1) return;

      maskCtx.save();
      roundedRect(maskCtx, rect.x, rect.y, rect.width, rect.height, rect.radius);
      maskCtx.fillStyle = cssVar('--bg3') || '#161b26';
      maskCtx.fill();
      maskCtx.clip();

      if (photoImg.complete && photoImg.naturalWidth) {
        const cover = Math.max(rect.width / photoImg.naturalWidth, rect.height / photoImg.naturalHeight) * 1.22;
        const drawWidth = photoImg.naturalWidth * cover;
        const drawHeight = photoImg.naturalHeight * cover;
        maskCtx.drawImage(photoImg, rect.x + (rect.width - drawWidth) / 2, rect.y + (rect.height - drawHeight) / 2 - rect.height * 0.08, drawWidth, drawHeight);
      }

      maskCtx.restore();
      maskCtx.save();
      roundedRect(maskCtx, rect.x + 0.5, rect.y + 0.5, rect.width - 1, rect.height - 1, rect.radius);
      maskCtx.strokeStyle = cssVar('--border') || '#1e2533';
      maskCtx.lineWidth = 0.5;
      maskCtx.stroke();
      maskCtx.restore();
    }

    function drawTextElement(item) {
      if (!item || item.width < 1 || item.height < 1) return;
      maskCtx.font = item.font;
      maskCtx.fillStyle = item.color;
      maskCtx.textAlign = 'center';
      maskCtx.textBaseline = 'middle';
      maskCtx.fillText(item.text, item.x + item.width / 2, item.y + item.height / 2 + item.height * 0.03);
    }

    function wrapWords(ctx, text, maxWidth) {
      const words = text.trim().split(/\s+/);
      const lines = [];
      let line = '';
      words.forEach((word) => {
        const test = line ? `${line} ${word}` : word;
        if (ctx.measureText(test).width > maxWidth && line) {
          lines.push(line);
          line = word;
        } else {
          line = test;
        }
      });
      if (line) lines.push(line);
      return lines;
    }

    function drawTagline() {
      const rect = layoutRef.current.tagline;
      if (!rect || rect.width < 1 || rect.height < 1) return;
      maskCtx.font = rect.font;
      maskCtx.fillStyle = rect.color;
      maskCtx.textAlign = 'center';
      maskCtx.textBaseline = 'middle';
      const lines = wrapWords(maskCtx, rect.text, rect.width);
      const startY = rect.y + rect.height / 2 - ((lines.length - 1) * rect.lineHeight) / 2;
      lines.forEach((line, index) => maskCtx.fillText(line, rect.x + rect.width / 2, startY + index * rect.lineHeight));
    }

    function drawMask() {
      const { width, height } = sizeRef.current;
      const lens = lensRefState.current;
      maskCtx.clearRect(0, 0, width, height);
      maskCtx.fillStyle = cssVar('--bg') || '#0d0f14';
      maskCtx.fillRect(0, 0, width, height);
      drawPhoto();
      layoutRef.current.texts.forEach((item) => drawTextElement(item));
      drawTagline();

      if (lens.inside && !lens.blocked) {
        maskCtx.save();
        maskCtx.globalCompositeOperation = 'destination-out';
        maskCtx.beginPath();
        maskCtx.arc(lens.x, lens.y, 130, 0, Math.PI * 2);
        maskCtx.fill();
        maskCtx.restore();
      }
    }

    function spawnPacket(now) {
      const attack = Math.random() < 0.68;
      const fromCity = cities[Math.floor(Math.random() * cities.length)];
      let toCity = attack ? amherst : cities[Math.floor(Math.random() * cities.length)];
      if (!attack && toCity === fromCity) toCity = cities[(cities.indexOf(fromCity) + 3) % cities.length];
      packetsRef.current.push({
        attack,
        from: project(fromCity),
        to: project(toCity),
        born: now,
        duration: 2100 + Math.random() * 1200,
      });
    }

    function drawMap(now) {
      const { width, height } = sizeRef.current;
      mapCtx.clearRect(0, 0, width, height);
      mapCtx.fillStyle = '#060810';
      mapCtx.fillRect(0, 0, width, height);

      mapCtx.fillStyle = 'rgba(148, 163, 184, 0.055)';
      for (let x = 0; x <= width; x += 24) {
        for (let y = 0; y <= height; y += 24) mapCtx.fillRect(x, y, 1, 1);
      }

      mapCtx.save();
      mapCtx.beginPath();
      path(mapFeatures.land);
      mapCtx.fillStyle = 'rgba(13, 27, 48, 0.76)';
      mapCtx.strokeStyle = 'rgba(79, 114, 160, 0.82)';
      mapCtx.lineWidth = 0.95;
      mapCtx.shadowBlur = 8;
      mapCtx.shadowColor = 'rgba(56, 91, 135, 0.25)';
      mapCtx.fill();
      mapCtx.stroke();

      mapCtx.shadowBlur = 0;
      mapCtx.beginPath();
      path(mapFeatures.borders);
      mapCtx.strokeStyle = 'rgba(104, 139, 180, 0.36)';
      mapCtx.lineWidth = 0.55;
      mapCtx.setLineDash([3, 4]);
      mapCtx.stroke();
      mapCtx.setLineDash([]);
      mapCtx.restore();

      packetsRef.current = packetsRef.current.filter((packet) => now - packet.born < packet.duration);
      packetsRef.current.forEach((packet) => {
        const progress = (now - packet.born) / packet.duration;
        const control = arcControl(packet.from, packet.to);
        const point = bezierPoint(packet.from, control, packet.to, progress);
        const color = packet.attack ? '248, 113, 113' : '74, 222, 128';

        mapCtx.beginPath();
        mapCtx.moveTo(packet.from.x, packet.from.y);
        mapCtx.quadraticCurveTo(control.x, control.y, packet.to.x, packet.to.y);
        mapCtx.strokeStyle = `rgba(${color}, ${packet.attack ? 0.22 : 0.15})`;
        mapCtx.lineWidth = packet.attack ? 1.15 : 0.9;
        mapCtx.stroke();

        mapCtx.beginPath();
        mapCtx.arc(point.x, point.y, packet.attack ? 3.2 : 2.4, 0, Math.PI * 2);
        mapCtx.fillStyle = `rgba(${color}, 0.9)`;
        mapCtx.shadowBlur = packet.attack ? 12 : 8;
        mapCtx.shadowColor = `rgba(${color}, 0.65)`;
        mapCtx.fill();
        mapCtx.shadowBlur = 0;
      });

      cities.forEach((city) => {
        const point = project(city);
        mapCtx.beginPath();
        mapCtx.arc(point.x, point.y, 2, 0, Math.PI * 2);
        mapCtx.fillStyle = 'rgba(148, 163, 184, 0.5)';
        mapCtx.fill();
      });

      const home = project(amherst);
      const pulse = 10 + Math.sin(now / 420) * 5;
      mapCtx.beginPath();
      mapCtx.arc(home.x, home.y, pulse, 0, Math.PI * 2);
      mapCtx.strokeStyle = 'rgba(74, 222, 128, 0.35)';
      mapCtx.lineWidth = 1.2;
      mapCtx.stroke();
      mapCtx.beginPath();
      mapCtx.arc(home.x, home.y, 4, 0, Math.PI * 2);
      mapCtx.fillStyle = 'rgba(74, 222, 128, 0.95)';
      mapCtx.shadowBlur = 16;
      mapCtx.shadowColor = 'rgba(74, 222, 128, 0.7)';
      mapCtx.fill();
      mapCtx.shadowBlur = 0;
    }

    function syncLens(event) {
      const rect = hero.getBoundingClientRect();
      const state = lensRefState.current;
      state.x = event.clientX - rect.left;
      state.y = event.clientY - rect.top;
      state.blocked = Boolean(event.target.closest('.hero-actions'));
      lens.style.left = `${state.x}px`;
      lens.style.top = `${state.y}px`;
      hero.classList.toggle('lens-active', state.inside && !state.blocked);
    }

    function frame(now) {
      if (!running) return;
      if (!visibleRef.current) {
        running = false;
        return;
      }
      if (now - lastSpawnRef.current > 650) {
        spawnPacket(now);
        lastSpawnRef.current = now;
      }
      drawMap(now);
      drawMask();
      animationRef.current = requestAnimationFrame(frame);
    }

    function startLoop() {
      if (running || !visibleRef.current) return;
      running = true;
      lastSpawnRef.current = performance.now();
      animationRef.current = requestAnimationFrame(frame);
    }

    function stopLoop() {
      running = false;
      cancelAnimationFrame(animationRef.current);
    }

    const pointerEnter = (event) => {
      if (event.pointerType === 'touch') return;
      lensRefState.current.inside = true;
      syncLens(event);
      startLoop();
    };
    const pointerMove = (event) => {
      if (event.pointerType === 'touch') return;
      syncLens(event);
      if (!lensRefState.current.blocked) startLoop();
    };
    const pointerLeave = () => {
      lensRefState.current.inside = false;
      lensRefState.current.blocked = false;
      hero.classList.remove('lens-active');
      stopLoop();
      drawMask();
    };
    const actionEnter = () => {
      lensRefState.current.blocked = true;
      hero.classList.remove('lens-active');
      stopLoop();
      drawMask();
    };
    const actionLeave = () => {
      lensRefState.current.blocked = false;
      if (lensRefState.current.inside) {
        hero.classList.add('lens-active');
        startLoop();
      }
    };

    const handlePhotoLoad = () => {
      measureLayout();
      drawMask();
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting;
        if (!entry.isIntersecting) {
          stopLoop();
          hero.classList.remove('lens-active');
          lensRefState.current.inside = false;
          lensRefState.current.blocked = false;
        } else {
          scheduleResize();
        }
      },
      { rootMargin: '0px' },
    );

    const start = async () => {
      if (document.fonts?.ready) await document.fonts.ready;
      resize();
      drawMap(performance.now());
      drawMask();
      hero.classList.add('canvas-ready');
      observer.observe(hero);
      if (visibleRef.current) startLoop();
    };

    hero.addEventListener('pointerenter', pointerEnter);
    hero.addEventListener('pointermove', pointerMove);
    hero.addEventListener('pointerleave', pointerLeave);
    actions?.addEventListener('pointerenter', actionEnter);
    actions?.addEventListener('pointerleave', actionLeave);
    window.addEventListener('resize', scheduleResize);
    photoImg.addEventListener('load', handlePhotoLoad);
    start();

    return () => {
      observer.disconnect();
      stopLoop();
      cancelAnimationFrame(resizeFrame);
      hero.removeEventListener('pointerenter', pointerEnter);
      hero.removeEventListener('pointermove', pointerMove);
      hero.removeEventListener('pointerleave', pointerLeave);
      actions?.removeEventListener('pointerenter', actionEnter);
      actions?.removeEventListener('pointerleave', actionLeave);
      window.removeEventListener('resize', scheduleResize);
      photoImg.removeEventListener('load', handlePhotoLoad);
    };
  }, [dark, mapFeatures]);

  return (
    <section
      id="about"
      ref={heroRef}
      className="hero relative isolate flex min-h-[calc(100vh_-_var(--nav-h))] scroll-mt-[var(--nav-h)] flex-col items-center justify-center overflow-hidden border-b border-borderc px-[clamp(20px,5vw,48px)] py-[clamp(32px,5vw,56px)] text-center"
    >
      <canvas ref={mapCanvasRef} className="hero-canvas z-10 bg-[#060810]" aria-hidden="true" />
      <canvas ref={maskCanvasRef} className="hero-canvas z-20" aria-hidden="true" />
      <div ref={lensRef} className="threat-lens" aria-hidden="true" />

      <div ref={headingRef} className="hero-heading relative z-30 mb-[clamp(28px,4vw,44px)] w-full max-w-[1320px] font-sans text-[clamp(32px,6vw,58px)] font-black leading-[1.08] tracking-normal text-text">
        <div className="hero-line hero-name-line mb-0 flex flex-nowrap items-center justify-center gap-[clamp(12px,1.8vw,24px)]">
          <span>Hi, I'm</span>
          <div ref={photoRef} className="hero-photo inline-flex size-[clamp(76px,7vw,108px)] shrink-0 items-center justify-center overflow-hidden rounded-[clamp(14px,1.2vw,18px)] border border-borderc bg-bg3">
            <img ref={photoImgRef} src="/profile_pic.JPG" alt="Pramith Kiran" className="size-full origin-[center_38%] scale-[1.22] rounded-[inherit] object-cover object-[center_34%]" />
          </div>
          <span>Pramith Kiran!</span>
        </div>
        <div className="hero-copy-desktop">
          <div className="hero-line flex items-center justify-center gap-[clamp(10px,1.4vw,18px)]">
            <span className="text-text2">I'm an&nbsp;</span>
            <span>MSCS student</span>
            <span className="text-text2">&nbsp;at</span>
          </div>
          <div className="hero-line flex items-center justify-center gap-[clamp(10px,1.4vw,18px)]">
            <span>UMass Amherst,&nbsp;</span>
            <span className="text-text2">into</span>
          </div>
          <div>
            <span>cybersecurity.</span>
          </div>
        </div>
        <div className="hero-copy-mobile hidden">
          <div className="hero-line flex items-center justify-center gap-[9px]">
            <span className="text-text2">I'm an&nbsp;</span>
            <span>MSCS student</span>
          </div>
          <div className="hero-line flex items-center justify-center gap-[9px]">
            <span className="text-text2">at</span>
            <span>UMass Amherst,</span>
          </div>
          <div className="hero-line flex items-center justify-center gap-[9px]">
            <span className="text-text2">into</span>
            <span>cybersecurity.</span>
          </div>
        </div>
      </div>

      <div className="hero-bottom relative z-30 flex flex-wrap items-center justify-center gap-[clamp(20px,3vw,44px)]">
        <p ref={taglineRef} className="hero-tagline whitespace-nowrap text-[clamp(13px,1.6vw,15px)] leading-[1.7] text-text2">
          Feel free to explore my work and reach out - I'd love to connect!
        </p>
        <div ref={actionsRef} className="hero-actions flex shrink-0 flex-wrap items-center gap-3">
          <SocialButton href="https://linkedin.com/in/pramithkiran" label="let's connect" title="Connect on LinkedIn" solid>
            <IconBrandLinkedin size={16} />
          </SocialButton>
          <SocialButton href="https://github.com/Pramith08" label="github" title="View GitHub">
            <IconBrandGithub size={16} />
          </SocialButton>
          <a href="/Pramith_Kiran_Resume.pdf" target="_blank" rel="noopener" className="inline-flex min-h-[42px] min-w-[clamp(124px,9.5vw,144px)] items-center justify-center gap-2 rounded-lg border border-text3 bg-bg3 px-[clamp(15px,2vw,22px)] py-2.5 text-[clamp(12px,1.4vw,13px)] font-bold text-text no-underline transition hover:scale-[1.04] hover:tracking-[0.02em] hover:opacity-90 active:scale-[0.97]">
            <IconDownload size={16} />
            resume
          </a>
        </div>
      </div>
    </section>
  );
}

function SocialButton({ href, label, title, solid = false, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener"
      aria-label={title}
      title={title}
      className={`social-pill inline-flex size-[42px] min-h-[42px] min-w-[42px] shrink-0 items-center justify-center gap-0 overflow-hidden rounded-lg text-[13px] font-bold no-underline transition-[width,min-width,padding,gap,transform,letter-spacing,opacity] duration-200 hover:w-[clamp(152px,10.8vw,168px)] hover:min-w-[clamp(152px,10.8vw,168px)] hover:scale-[1.04] hover:gap-2 hover:px-[clamp(15px,2vw,22px)] hover:tracking-[0.02em] hover:opacity-90 focus-visible:w-[clamp(152px,10.8vw,168px)] focus-visible:min-w-[clamp(152px,10.8vw,168px)] focus-visible:gap-2 focus-visible:px-[clamp(15px,2vw,22px)] active:scale-[0.97] ${solid ? 'bg-[var(--connect-bg)] text-[var(--connect-fg)]' : 'border border-text3 bg-bg3 text-text'}`}
    >
      <span className="inline-flex size-4 shrink-0 items-center justify-center">{children}</span>
      <span className="pill-text">{label}</span>
    </a>
  );
}

function SectionHeader({ number, title }) {
  return (
    <div className="mb-[clamp(28px,4vw,40px)] flex items-center gap-4">
      <span className="font-mono text-[clamp(16px,2.5vw,20px)] font-medium text-text3">{number}</span>
      <span className="font-sans text-[clamp(18px,3vw,22px)] font-bold tracking-normal text-text">{title}</span>
      <div className="h-px flex-1 bg-borderc" />
    </div>
  );
}

function TimelineDot({ active = false }) {
  return (
    <div className={`absolute left-[calc(var(--rail-x)-var(--rail-pad)-7px)] top-6 z-10 size-[var(--dot-size)] rounded-full border-2 bg-bg shadow-[0_0_0_5px_var(--bg),0_0_0_6px_var(--border)] ${active ? 'border-accent after:bg-accent' : 'border-borderc after:bg-bg3'} after:absolute after:inset-1 after:rounded-full`} />
  );
}

function Tag({ children }) {
  return <span className="rounded-sm border border-borderc bg-[var(--tag-bg)] px-2 py-1 font-mono text-[11px] text-text2">{children}</span>;
}

function Projects() {
  return (
    <section id="projects" className="scroll-mt-[var(--nav-h)] border-b border-borderc px-[clamp(20px,5vw,48px)] py-[clamp(36px,6vw,56px)]">
      <SectionHeader number="01" title="projects" />
      <p className="mb-[clamp(24px,4vw,36px)] text-sm leading-6 text-text2">A chronological timeline of selected systems, research, and web projects.</p>
      <div className="relative pl-[var(--rail-pad)] [--dot-size:16px] [--rail-pad:clamp(42px,4vw,54px)] [--rail-x:16px] before:absolute before:bottom-6 before:left-[var(--rail-x)] before:top-6 before:w-0.5 before:rounded-full before:bg-gradient-to-b before:from-text3 before:to-borderc before:opacity-75 after:absolute after:left-[calc(var(--rail-x)-3px)] after:top-6 after:size-2 after:rounded-full after:bg-accent after:shadow-[0_0_0_4px_var(--bg)]">
        {projects.map((project, index) => (
          <div key={project.title} className="relative mb-7 last:mb-0">
            <TimelineDot active={index === 0} />
            <div className="rounded-lg border border-borderc bg-bg2 px-[clamp(16px,3vw,26px)] py-[clamp(16px,3vw,24px)] transition hover:border-text3 hover:bg-bg3">
              <div className="mb-1 flex flex-wrap items-start justify-between gap-2">
                <div className="font-sans text-[clamp(14px,2vw,15px)] font-bold tracking-normal text-text">{project.title}</div>
                <span className="whitespace-nowrap font-mono text-[11px] text-text3">{project.date}</span>
              </div>
              <div className="mb-2 font-mono text-xs text-text2">{project.subtitle}</div>
              <p className="mb-3 text-[13px] leading-[1.65] text-text2">{project.desc}</p>
              <div className="flex flex-wrap gap-1.5">{project.tags.map((tag) => <Tag key={tag}>{tag}</Tag>)}</div>
              <div className="mt-3.5 flex flex-wrap gap-2">
                {project.links.map(([label, href, Icon]) => (
                  <a key={label} href={href} target="_blank" rel="noopener" className="inline-flex min-h-[34px] items-center gap-2 rounded-md border border-text3 bg-bg3 px-3 py-2 font-mono text-xs font-medium text-text no-underline transition hover:-translate-y-px">
                    <Icon size={14} />
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" className="scroll-mt-[var(--nav-h)] border-b border-borderc px-[clamp(20px,5vw,48px)] py-[clamp(36px,6vw,56px)]">
      <SectionHeader number="02" title="experience" />
      <div className="relative pl-[var(--rail-pad)] [--dot-size:16px] [--rail-pad:clamp(42px,4vw,54px)] [--rail-x:16px] before:absolute before:bottom-6 before:left-[var(--rail-x)] before:top-6 before:w-0.5 before:rounded-full before:bg-gradient-to-b before:from-text3 before:to-borderc before:opacity-75 after:absolute after:left-[calc(var(--rail-x)-3px)] after:top-6 after:size-2 after:rounded-full after:bg-accent after:shadow-[0_0_0_4px_var(--bg)]">
        {experiences.map((item) => (
          <div key={item.role} className="relative mb-[22px] last:mb-0">
            <TimelineDot active={item.active} />
            <div className="rounded-lg border border-borderc bg-bg2 px-[clamp(14px,2.5vw,24px)] py-[clamp(14px,2.5vw,20px)] transition hover:border-text3 hover:bg-bg3">
              <div className="mb-1 flex flex-wrap items-start justify-between gap-2">
                <div className="font-sans text-[clamp(14px,2vw,15px)] font-bold text-text">{item.role}</div>
                <span className="whitespace-nowrap font-mono text-[11px] text-text3">{item.period}</span>
              </div>
              <div className="mb-2 font-mono text-xs text-text2">{item.org}</div>
              <p className="mb-3 text-[13px] leading-[1.65] text-text2">{item.desc}</p>
              <div className="flex flex-wrap gap-1.5">{item.tags.map((tag) => <Tag key={tag}>{tag}</Tag>)}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Blog() {
  return (
    <section id="blog" className="scroll-mt-[var(--nav-h)] border-b border-borderc px-[clamp(20px,5vw,48px)] py-[clamp(36px,6vw,56px)]">
      <SectionHeader number="03" title="blog" />
      <p className="mb-6 text-sm leading-6 text-text2">Planned write-ups, deep dives, and technical notes.</p>
      <div className="relative pl-[var(--rail-pad)] [--dot-size:16px] [--rail-pad:clamp(42px,4vw,54px)] [--rail-x:16px] before:absolute before:bottom-6 before:left-[var(--rail-x)] before:top-6 before:w-0.5 before:rounded-full before:bg-gradient-to-b before:from-text3 before:to-borderc before:opacity-75 after:absolute after:left-[calc(var(--rail-x)-3px)] after:top-6 after:size-2 after:rounded-full after:bg-accent after:shadow-[0_0_0_4px_var(--bg)]">
        {blogs.map((blog) => (
          <div key={blog.title} className="relative mb-5 last:mb-0">
            <TimelineDot active />
            <div className="flex cursor-pointer items-start gap-[clamp(12px,2vw,20px)] rounded-lg border border-borderc bg-bg2 px-[clamp(14px,2.5vw,22px)] py-[clamp(14px,2.5vw,18px)] transition hover:-translate-y-px hover:border-text3 hover:bg-bg3">
              <div className="min-w-0 flex-1">
                <div className="mb-1 text-sm font-medium leading-5 text-text">{blog.title}</div>
                <p className="text-xs leading-6 text-text2">{blog.preview}</p>
                <div className="mt-2.5 flex flex-wrap items-center justify-between gap-2">
                  <span className="rounded-sm border border-borderc bg-[var(--tag-bg)] px-2 py-0.5 font-mono text-[10px] text-text2">{blog.tag}</span>
                  <span className="font-mono text-[11px] text-text underline underline-offset-4">coming soon</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="scroll-mt-[var(--nav-h)] border-b border-borderc px-[clamp(20px,5vw,48px)] py-[clamp(36px,6vw,56px)]">
      <SectionHeader number="04" title="contact" />
      <div className="mx-auto grid max-w-[1120px] grid-cols-1 gap-6">
        <div>
          <div className="mb-2.5 font-sans text-[clamp(24px,4vw,32px)] font-black leading-tight tracking-normal text-text">Let's work together.</div>
          <p className="max-w-[620px] text-[13px] leading-7 text-text2">Open to SOC analyst, threat intelligence, and security engineering roles. Feel free to reach out.</p>
        </div>
        <div className="grid grid-cols-3 gap-3 max-[760px]:grid-cols-1">
          <ContactCard href="mailto:pramith@pramithkiran.in" icon={<IconMail size={16} />} label="email" value="pramith@pramithkiran.in" />
          <ContactCard href="https://github.com/Pramith08" icon={<IconBrandGithub size={16} />} label="github" value="github.com/Pramith08" />
          <ContactCard href="https://linkedin.com/in/pramithkiran" icon={<IconBrandLinkedin size={16} />} label="linkedin" value="linkedin.com/in/pramithkiran" />
        </div>
      </div>
    </section>
  );
}

function ContactCard({ href, icon, label, value }) {
  return (
    <a href={href} target={href.startsWith('mailto:') ? undefined : '_blank'} rel="noopener" className="flex min-h-[78px] items-center gap-3 rounded-lg border border-borderc bg-bg2 p-3.5 font-mono text-text no-underline transition hover:-translate-y-px hover:border-text3 hover:bg-bg3">
      <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-md border border-borderc text-text">{icon}</span>
      <span className="min-w-0">
        <span className="mb-1 block text-[10px] uppercase tracking-[0.08em] text-text3">{label}</span>
        <span className="block overflow-hidden text-ellipsis whitespace-nowrap text-xs leading-5 text-text2">{value}</span>
      </span>
    </a>
  );
}

function Nav({ dark, setDark, active, setActive }) {
  const [open, setOpen] = useState(false);

  const go = (id) => {
    setOpen(false);
    setActive(id);
  };

  return (
    <nav className="fixed inset-x-0 top-0 z-50 flex min-h-[var(--nav-h)] w-full flex-wrap items-center justify-between gap-3 border-b border-borderc bg-bg px-[clamp(20px,5vw,48px)] py-4 transition-colors max-[760px]:grid max-[760px]:grid-cols-[1fr_auto] max-[760px]:px-3.5 max-[760px]:py-2.5">
      <div className="shrink-0 font-mono text-sm font-medium text-text max-[760px]:text-xs">pk<span className="text-text3">.portfolio</span></div>
      <div className="flex flex-wrap gap-[clamp(14px,3vw,28px)] max-[760px]:hidden">
        {navItems.map(([id, label]) => (
          <a key={id} href={`#${id}`} onClick={() => go(id)} className={`whitespace-nowrap font-mono text-[13px] no-underline ${active === id ? 'font-medium text-text' : 'text-text2 hover:text-text'}`}>
            {label}
          </a>
        ))}
      </div>
      <div className="flex shrink-0 items-center gap-2.5 max-[760px]:justify-self-end">
        <details className="relative hidden max-[760px]:block" open={open} onToggle={(e) => setOpen(e.currentTarget.open)}>
          <summary className="flex size-8 cursor-pointer list-none items-center justify-center rounded-md border border-borderc bg-bg2 text-text2 [&::-webkit-details-marker]:hidden" aria-label="Open navigation menu" title="Menu">
            <IconMenu2 size={17} />
          </summary>
          <div className="absolute right-0 top-[calc(100%+10px)] z-30 w-[180px] rounded-lg border border-borderc bg-bg2 p-2 shadow-2xl">
            {navItems.map(([id, label]) => (
              <a key={id} href={`#${id}`} onClick={() => go(id)} className={`block rounded-md border border-transparent px-3 py-2.5 font-mono text-xs no-underline ${active === id ? 'border-borderc bg-bg3 font-medium text-text' : 'text-text2 hover:border-borderc hover:bg-bg3 hover:text-text'}`}>
                {label}
              </a>
            ))}
          </div>
        </details>
        <button onClick={() => setDark((value) => !value)} className="flex h-[34px] min-w-[74px] cursor-pointer items-center justify-center gap-1.5 rounded-md border border-borderc bg-bg2 px-3 font-mono text-[11px] text-text2 max-[760px]:size-8 max-[760px]:min-w-8 max-[760px]:bg-transparent max-[760px]:p-0" aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'} title={dark ? 'Switch to light theme' : 'Switch to dark theme'}>
          {dark ? <IconSun size={15} /> : <IconMoon size={15} />}
          <span className="max-[760px]:hidden">{dark ? 'light' : 'dark'}</span>
        </button>
      </div>
    </nav>
  );
}

export default function App() {
  const [dark, setDark] = useState(() => window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? true);
  const [active, setActive] = useState('about');

  useEffect(() => {
    let ticking = false;

    const updateActive = () => {
      const navHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h'), 10) || 0;
      const marker = window.scrollY + navHeight + 80;
      let current = 'about';
      navItems.forEach(([id]) => {
        const section = document.getElementById(id);
        if (section && section.offsetTop <= marker) current = id;
      });
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) current = 'contact';
      setActive((prev) => (prev === current ? prev : current));
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        updateActive();
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('load', updateActive);
    updateActive();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('load', updateActive);
    };
  }, []);

  return (
    <div data-theme={dark ? 'dark' : ''} className="min-h-screen w-full overflow-x-hidden bg-bg pt-[var(--nav-h)] font-sans text-sm text-text transition-colors">
      <Nav dark={dark} setDark={setDark} active={active} setActive={setActive} />
      <HeroThreatReveal dark={dark} />
      <Projects />
      <Experience />
      <Blog />
      <Contact />
      <footer className="flex flex-wrap justify-between gap-2 border-t border-borderc bg-bg2 px-[clamp(20px,5vw,48px)] py-5 font-mono text-[11px] text-text3 max-[760px]:px-[18px]">
        <div>pramithkiran.in</div>
        <div>© 2025 Pramith Kiran</div>
      </footer>
    </div>
  );
}
