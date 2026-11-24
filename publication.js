export function publicationUrl(paper) {
  return paper.sourceUrl || 'https://arxiv.org/abs/' + paper.idArxiv;
}
