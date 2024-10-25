'use client';

export function Background() {
  return (
    <div className="fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-[#FFFDF4]" />
      <div className="absolute inset-0 grid grid-cols-4 gap-36 p-36 opacity-[0.08]">
        {Array.from({ length: 16 }).map((_, i) => (
          <svg key={i} id="a" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1340 1060" className="w-full h-full">
            <path d="M749.47,103.42l-12.65-15.45c-.66-.8-1.76-1.09-2.72-.71l-18.62,7.26c-.96,.38-1.57,1.32-1.52,2.36l1.15,19.95c.06,1.04,.78,1.91,1.79,2.18l19.32,5.07c1,.26,2.06-.15,2.62-1.02l10.8-16.82c.57-.88,.5-2.01-.16-2.82h0Z"/>
            <path d="M312.26,676.62l16.55-3.53c.56-.12,1.1,.24,1.22,.79h0c.05,.22,.02,.45-.07,.65l-7.26,15.29c-.15,.31-.14,.67,.04,.97l8.47,14.65c.28,.49,.12,1.12-.37,1.4h0c-.2,.11-.42,.16-.65,.13l-16.79-2.19c-.33-.05-.67,.07-.9,.32l-11.3,12.59c-.37,.43-1.02,.47-1.45,.1-.17-.16-.28-.37-.32-.6l-3.11-16.63c-.06-.33-.28-.61-.59-.75l-15.48-6.87c-.52-.23-.76-.83-.54-1.36h0c.09-.21,.25-.38,.45-.49l14.85-8.09c.3-.16,.5-.46,.53-.8l1.76-16.83c.05-.56,.56-.98,1.12-.92,.23,.02,.45,.12,.61,.28l12.29,11.62c.25,.25,.6,.35,.95,.27h0Z"/>
            <path d="M633.18,307.07l10.05-3.7c.33-.13,.71,.04,.83,.37h0c.05,.14,.05,.29,0,.43l-3.17,10.23c-.06,.2-.02,.42,.11,.59l6.63,8.41c.22,.29,.17,.7-.12,.92h0c-.11,.08-.25,.13-.39,.14l-10.71,.14c-.21,0-.41,.11-.53,.29l-5.96,8.9c-.2,.3-.6,.38-.9,.18-.11-.08-.2-.2-.25-.33l-3.45-10.14c-.07-.2-.24-.36-.44-.41l-10.31-2.91c-.35-.08-.56-.44-.48-.79h0c.04-.16,.13-.28,.25-.36l8.58-6.41c.17-.13,.27-.33,.26-.55l-.41-10.7c-.02-.36,.26-.66,.62-.68h0c.15,0,.29,.04,.41,.12l8.75,6.18c.18,.13,.42,.16,.63,.08h0Z"/>
          </svg>
        ))}
      </div>
    </div>
  );
}