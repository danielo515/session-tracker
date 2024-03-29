module.exports = async ({ core, links, manifest }) => {
  console.log('data', links, manifest);
  const result = manifest.summary;
  const formatResult = (res) => Math.round(res * 100);
  Object.keys(result).forEach((key) => (result[key] = formatResult(result[key])));
  const score = (res) => (res >= 90 ? '🟢' : res >= 50 ? '🟠' : '🔴');
  const comment = [
    `⚡️ [Lighthouse report](${Object.values(links)[0]}) for the changes in this PR:`,
    '| Category | Score |',
    '| --- | --- |',
    `| ${score(result.performance)} Performance | ${result.performance} |`,
    `| ${score(result.accessibility)} Accessibility | ${result.accessibility} |`,
    `| ${score(result['best-practices'])} Best practices | ${result['best-practices']} |`,
    `| ${score(result.seo)} SEO | ${result.seo} |`,
    `| ${score(result.pwa)} PWA | ${result.pwa} |`,
    ' ',
    `*Lighthouse ran on [${Object.keys(links)[0]}](${Object.keys(links)[0]})*`,
    `${new Date().toLocaleString()}`,
  ].join('\n');
  core.setOutput('comment', comment);
};
