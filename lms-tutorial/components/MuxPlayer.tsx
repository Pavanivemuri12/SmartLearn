// components/MuxPlayer.tsx
"use client";

import '@mux/mux-player-react'; // or the relevant mux package
import { MuxPlayerProps } from '@mux/mux-player-react';

export const MuxPlayer = (props: MuxPlayerProps) => {
  return <mux-player {...props} />;
};
