// src/database/database.ts
import { v4 as uuidv4 } from 'uuid';

type Problem = {
  id: string;
  code: string;
  score_know: number | null;
  score_appr: number | null;
  score_clar: number | null;
  score_cons: number | null;
  score_usef: number | null;
  feedback_code: string;
  feedback_come: string;
};

let problems: Problem[] = [];

export const addProblem = (
  code: string,
  score_know: number | null,
  score_appr: number | null,
  score_clar: number | null,
  score_cons: number | null,
  score_usef: number | null,
  feedback_code: string,
  feedback_come: string
): void => {
  const problem: Problem = {
    id: uuidv4(),
    code,
    score_know,
    score_appr,
    score_clar,
    score_cons,
    score_usef,
    feedback_code,
    feedback_come
  };
  problems.push(problem);
};

export const getProblems = (): Problem[] => {
  return problems;
};

export const getProblemById = (id: string): Problem | undefined => {
  return problems.find(problem => problem.id === id);
};