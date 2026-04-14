import { supabase } from './supabase';

export interface ScoreEntry {
  id: number;
  school: string;
  player_name: string;
  prof_names: string;
  score: number;
  created_at: string;
}

export async function saveScore(data: {
  school: string;
  playerName: string;
  profNames: string;
  score: number;
}): Promise<void> {
  const { error } = await supabase.from('scores').insert({
    school: data.school,
    player_name: data.playerName,
    prof_names: data.profNames,
    score: data.score,
  });
  if (error) throw error;
}

/** 같은 학교 Top N */
export async function getSchoolTopScores(school: string, limit = 10): Promise<ScoreEntry[]> {
  const { data, error } = await supabase
    .from('scores')
    .select('*')
    .eq('school', school)
    .order('score', { ascending: false })
    .limit(limit);
  if (error) throw error;
  return data ?? [];
}

/** 전체 Top N */
export async function getGlobalTopScores(limit = 10): Promise<ScoreEntry[]> {
  const { data, error } = await supabase
    .from('scores')
    .select('*')
    .order('score', { ascending: false })
    .limit(limit);
  if (error) throw error;
  return data ?? [];
}
