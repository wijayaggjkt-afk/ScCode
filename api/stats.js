let stats = {
  total: 0,
  ig: 0,
  tt: 0
};

export function addStat(type) {
  stats.total++;
  if (type === "Instagram") stats.ig++;
  if (type === "TikTok") stats.tt++;
}

export function getStats() {
  return stats;
}
