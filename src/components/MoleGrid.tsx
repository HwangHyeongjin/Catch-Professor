import { MoleState } from '../types/game';
import Mole from './Mole';

interface MoleGridProps {
  moles: MoleState[];
  prof1Name: string;
  prof2Name: string;
  onHit: (id: number) => void;
  onMiss: () => void;
  missShake: boolean;
  isDesktop?: boolean;
}

export default function MoleGrid({ moles, prof1Name, prof2Name, onHit, onMiss, missShake, isDesktop = false }: MoleGridProps) {
  return (
    <div
      className={`grid grid-cols-4 rounded-2xl ${missShake ? 'shake' : ''} ${isDesktop ? 'gap-5 p-6' : 'gap-2 p-3'}`}
      style={{ background: 'rgba(255,255,255,0.04)', border: '1.5px solid rgba(255,255,255,0.08)' }}
    >
      {moles.map((mole) => (
        <Mole
          key={mole.id}
          mole={mole}
          prof1Name={prof1Name}
          prof2Name={prof2Name}
          onHit={onHit}
          onMiss={onMiss}
          holeSize={isDesktop ? 'desktop' : 'xs'}
        />
      ))}
    </div>
  );
}
