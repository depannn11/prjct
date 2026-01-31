'use client';

import { useEffect, useState } from 'react';

interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isComplete: boolean;
}

export function CountdownScene() {
  const [time, setTime] = useState<CountdownTime>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isComplete: false,
  });

  useEffect(() => {
    // Target: 25 Februari 2026, 13:00:00 WIB (UTC+7)
    // Konversi ke UTC: 25 Feb 2026 06:00:00 UTC
    const targetUTC = new Date(Date.UTC(2026, 1, 25, 6, 0, 0)).getTime();

    const updateCountdown = () => {
      const now = Date.now();
      const gap = targetUTC - now;

      if (gap <= 0) {
        setTime({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isComplete: true,
        });
        return;
      }

      const days = Math.floor(gap / (1000 * 60 * 60 * 24));
      const hours = Math.floor((gap % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((gap % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((gap % (1000 * 60)) / 1000);

      setTime({ days, hours, minutes, seconds, isComplete: false });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  const pad = (num: number) => String(num).padStart(2, '0');

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <div className="max-w-2xl w-full">
        {/* Illustration Scene */}
        <div className="relative h-40 mb-12 flex items-center justify-center">
          {/* Server Rack */}
          <div className="absolute left-1/2 top-4 -translate-x-1/2 w-20 h-28 bg-indigo-100 border-2 border-gray-900 rounded-lg shadow-lg">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-1.5 bg-indigo-400 w-[85%] mx-auto my-2 rounded animate-[serverLight_1.5s_infinite_alternate]"
                style={{
                  animation: 'serverLight 1.5s infinite alternate',
                  animationDelay: `${i * 0.3}s`,
                }}
              />
            ))}
          </div>

          {/* Person */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 h-24">
            {/* Head */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-8 bg-orange-300 border-2 border-gray-900 rounded-full" />

            {/* Body */}
            <div className="absolute top-7 left-1/2 -translate-x-1/2 w-10 h-12 bg-sky-400 border-2 border-gray-900 rounded-b-2xl" />

            {/* Left Arm */}
            <div
              className="absolute top-8 left-3 w-2.5 h-9 bg-sky-400 border-2 border-gray-900 rounded"
              style={{ animation: 'armWiggle 2s ease-in-out infinite' }}
            />

            {/* Right Arm */}
            <div
              className="absolute top-8 right-3 w-2.5 h-9 bg-sky-400 border-2 border-gray-900 rounded"
              style={{ animation: 'armWiggle 2s ease-in-out infinite', animationDirection: 'reverse' }}
            />

            {/* Left Leg */}
            <div className="absolute bottom-0 left-2 w-3.5 h-8 bg-slate-600 border-2 border-gray-900 rounded" />

            {/* Right Leg */}
            <div className="absolute bottom-0 right-2 w-3.5 h-8 bg-slate-600 border-2 border-gray-900 rounded" />
          </div>

          {/* Floating Elements */}
          <div
            className="absolute top-2 left-5 text-2xl"
            style={{ animation: 'floatAndRotate 4s ease-in-out infinite' }}
          >
            ⚙️
          </div>

          <div
            className="absolute bottom-5 right-5 w-5 h-5 bg-yellow-300 border-2 border-yellow-400 rounded"
            style={{
              transform: 'rotate(45deg)',
              animation: 'floatSmooth 3s ease-in-out infinite',
            }}
          />
        </div>

        {/* Content */}
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-2 text-gray-900">
          Konfigurasi Sistem & Infrastruktur
        </h1>
        <p className="text-center text-gray-600 text-base mb-8">
          Tim kami sedang bekerja keras untuk menyiapkan proyek terbesar. Harap bersabar!
        </p>

        {/* Countdown Grid */}
        {!time.isComplete ? (
          <div className="grid grid-cols-4 gap-3 mb-8">
            <TimeCard value={pad(time.days)} label="Hari" />
            <TimeCard value={pad(time.hours)} label="Jam" />
            <TimeCard value={pad(time.minutes)} label="Menit" />
            <TimeCard value={pad(time.seconds)} label="Detik" />
          </div>
        ) : (
          <div className="bg-green-100 border-2 border-green-500 rounded-lg p-6 mb-8 text-center">
            <h2 className="text-2xl font-bold text-green-700">Sistem telah aktif!</h2>
            <p className="text-green-600 mt-2">Terima kasih atas kesabarannya.</p>
          </div>
        )}

        {/* Link Box */}
        <div className="bg-slate-100 border-2 border-dashed border-slate-400 rounded-2xl p-6">
          <p className="text-center text-sm text-gray-700 mb-4">
            Butuh download video TikTok tanpa watermark sekarang?
          </p>
          <a
            href="https://ssstiktok.soraa.my.id"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-gray-900 hover:bg-gray-800 text-white font-medium py-3 px-4 rounded-lg text-center transition-colors"
          >
            Kunjungi ssstiktok.soraa.my.id
          </a>
        </div>

        {/* Timezone Info */}
        <p className="text-center text-xs text-gray-500 mt-6">
          Target: 25 Februari 2026 pukul 13:00 WIB (Indonesia Standard Time)
        </p>
      </div>
    </div>
  );
}

interface TimeCardProps {
  value: string;
  label: string;
}

function TimeCard({ value, label }: TimeCardProps) {
  return (
    <div className="bg-gray-50 border border-gray-300 rounded-xl p-4 text-center">
      <div className="text-2xl font-bold text-gray-900">{value}</div>
      <div className="text-xs uppercase text-gray-500 mt-1">{label}</div>
    </div>
  );
}
