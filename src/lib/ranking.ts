import { supabase } from './supabase';

export interface ScoreEntry {
  id: number;
  school: string;
  player_name: string;
  prof_names: string;
  score: number;
  created_at: string;
}

/** 최초 저장 → 생성된 ID 반환 */
export async function saveScore(data: {
  school: string;
  playerName: string;
  profNames: string;
  score: number;
}): Promise<number> {
  const { data: inserted, error } = await supabase.from('scores').insert({
    school: data.school,
    player_name: data.playerName,
    prof_names: data.profNames,
    score: data.score,
  }).select('id').single();
  if (error) throw error;
  return inserted.id;
}

/** 재시작 시 기존 레코드 점수만 UPDATE */
export async function updateScore(id: number, score: number): Promise<void> {
  const { error } = await supabase.from('scores').update({ score }).eq('id', id);
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
