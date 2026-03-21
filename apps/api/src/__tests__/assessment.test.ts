export function determineLevel(score: number): 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'EXPERT' {
  if (score > 90) return 'EXPERT';
  if (score > 70) return 'ADVANCED';
  if (score > 40) return 'INTERMEDIATE';
  return 'BEGINNER';
}

describe('Level Determination', () => {
  it('should return BEGINNER for low scores', () => {
    expect(determineLevel(20)).toBe('BEGINNER');
  });

  it('should return INTERMEDIATE for medium scores', () => {
    expect(determineLevel(50)).toBe('INTERMEDIATE');
  });

  it('should return ADVANCED for high scores', () => {
    expect(determineLevel(80)).toBe('ADVANCED');
  });

  it('should return EXPERT for very high scores', () => {
    expect(determineLevel(95)).toBe('EXPERT');
  });
});
