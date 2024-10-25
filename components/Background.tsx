'use client';

export function Background() {
  return (
    <div className="fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-[#FFFDF4]" />
      <div className="absolute inset-0 bg-repeat opacity-10">
        <div className="w-full h-full" style={{ 
          backgroundImage: 'url(/background.png)',
          backgroundSize: '400px',
          backgroundRepeat: 'repeat'
        }} />
      </div>
    </div>
  );
}