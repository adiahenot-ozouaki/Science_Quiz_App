/**
 * Sons subtils du quiz — Web Audio API, sans fichiers externes.
 * Volume bas, enveloppes courtes, respect du mute utilisateur.
 */

const MUTE_KEY = "scientific-quiz-mute";

let ctx: AudioContext | null = null;
let muted = false;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  try {
    if (!ctx) {
      const AC =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      if (!AC) return null;
      ctx = new AC();
    }
    if (ctx.state === "suspended") {
      void ctx.resume();
    }
    return ctx;
  } catch {
    return null;
  }
}

export function loadMute(): boolean {
  try {
    muted = localStorage.getItem(MUTE_KEY) === "1";
  } catch {
    muted = false;
  }
  return muted;
}

export function isMuted(): boolean {
  return muted;
}

export function setMuted(value: boolean) {
  muted = value;
  try {
    localStorage.setItem(MUTE_KEY, value ? "1" : "0");
  } catch {
    /* ignore */
  }
}

function tone(
  frequency: number,
  duration: number,
  options: {
    type?: OscillatorType;
    gain?: number;
    attack?: number;
    detune?: number;
    delay?: number;
  } = {},
) {
  if (muted) return;
  const audio = getCtx();
  if (!audio) return;

  const {
    type = "sine",
    gain = 0.06,
    attack = 0.012,
    detune = 0,
    delay = 0,
  } = options;

  const t0 = audio.currentTime + delay;
  const osc = audio.createOscillator();
  const g = audio.createGain();
  osc.type = type;
  osc.frequency.value = frequency;
  osc.detune.value = detune;
  g.gain.setValueAtTime(0.0001, t0);
  g.gain.exponentialRampToValueAtTime(gain, t0 + attack);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + duration);
  osc.connect(g);
  g.connect(audio.destination);
  osc.start(t0);
  osc.stop(t0 + duration + 0.02);
}

/** Clic léger sur une option */
export function playTap() {
  tone(520, 0.045, { gain: 0.035, type: "triangle" });
}

/** Bonne réponse — deux notes montantes douces */
export function playCorrect() {
  tone(523.25, 0.12, { gain: 0.055, type: "sine" }); // C5
  tone(659.25, 0.16, { gain: 0.05, type: "sine", delay: 0.07 }); // E5
}

/** Mauvaise réponse — note basse brève */
export function playWrong() {
  tone(180, 0.14, { gain: 0.045, type: "triangle" });
  tone(140, 0.12, { gain: 0.03, type: "sine", delay: 0.05 });
}

/** Temps écoulé */
export function playTimeout() {
  tone(320, 0.1, { gain: 0.04, type: "sine" });
  tone(240, 0.14, { gain: 0.035, type: "sine", delay: 0.09 });
}

/** Tick urgent (3, 2, 1 s) — très discret */
export function playUrgentTick() {
  tone(880, 0.04, { gain: 0.025, type: "sine" });
}

/** Fin de partie */
export function playComplete() {
  tone(392, 0.1, { gain: 0.04, type: "sine" });
  tone(523.25, 0.12, { gain: 0.045, type: "sine", delay: 0.1 });
  tone(659.25, 0.18, { gain: 0.05, type: "sine", delay: 0.2 });
}

/** Déblocage du contexte audio après un geste utilisateur */
export function unlockAudio() {
  getCtx();
}
