import { useState } from 'react';
import StartScreen from './components/StartScreen';
import GameScreen from './components/GameScreen';
import EndScreen from './components/EndScreen';

type Screen = 'start' | 'game' | 'end';

interface PlayerInfo {
  prof1: string;
  prof2: string;
  playerName: string;
  school: string;
}

export default function App() {
  const [screen, setScreen] = useState<Screen>('start');
  const [player, setPlayer] = useState<PlayerInfo>({ prof1: '', prof2: '', playerName: '', school: '' });
  const [finalScore, setFinalScore] = useState(0);
  const [gameKey, setGameKey] = useState(0);

  const handleStart = (data: PlayerInfo) => {
    setPlayer(data);
    setGameKey((k) => k + 1);
    setScreen('game');
  };

  const handleEnd = (score: number) => {
    setFinalScore(score);
    setScreen('end');
  };

  const handleRestart = () => {
    setGameKey((k) => k + 1);
    setScreen('game');
  };

  return (
    <div className="w-full min-h-screen">
      {screen === 'start' && <StartScreen onStart={handleStart} />}
      {screen === 'game' && (
        <GameScreen key={gameKey}
          prof1Name={player.prof1} prof2Name={player.prof2}
          onEnd={handleEnd} onHome={() => setScreen('start')} />
      )}
      {screen === 'end' && (
        <EndScreen score={finalScore}
          prof1Name={player.prof1} prof2Name={player.prof2}
          playerName={player.playerName} school={player.school}
          onRestart={handleRestart} onHome={() => setScreen('start')} />
      )}
    </div>
  );
}
