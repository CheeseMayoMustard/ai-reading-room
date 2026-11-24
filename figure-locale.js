import {conceptZh} from './concept-zh.js?v=readingedit1';

export function figureText(value) {
  if (!document.documentElement.lang.startsWith('zh')) return value;
  const text = String(value);
  if (conceptZh[text]) return conceptZh[text];
  let m;
  if ((m = text.match(/^Values \[0,5,10\] give weighted output ([\d.]+)\.$/))) return '数值 0、5、10 分别乘以上图的权重后相加，得到 ' + m[1] + '。';
  if ((m = text.match(/^8 billion weights × (\d+) bits ÷ 8 = (\d+) decimal GB\. Raw weight storage only\.$/))) return '80 亿个权重 × ' + m[1] + ' 位 ÷ 8 = ' + m[2] + ' GB（十进制，仅计权重）。';
  if ((m = text.match(/^(\d+) of 8 equal-size experts are active for this toy token\. Shared layers are excluded\.$/))) return '本词元使用八个同等大小的专家中的 ' + m[1] + ' 个。图中未计共享层。';
  if ((m = text.match(/^(precision|recall) = (\d+\/\d+ = [\d.]+%)\. The search returns 10 items from a collection containing 20 relevant items\.$/))) return (m[1] === 'precision' ? '精确率' : '召回率') + ' = ' + m[2] + '。本例共返回 10 项，资料库里共有 20 个相关项。';
  if ((m = text.match(/^Query (\d+) can use positions 1 through (\d+)\. Future positions receive zero attention weight\.$/))) return '位置 ' + m[1] + ' 可以参考第 1 至第 ' + m[2] + ' 个位置，后续位置的注意力权重均为零。';
  if ((m = text.match(/^Green: .*The penalized minimum is w = ([\d.]+)\.$/))) return '绿色实线为 (w−2)²，虚线为加入惩罚项的 (w−2)² + λw²。在 w = ' + m[1] + ' 时，加入惩罚项后的函数最小。';
  if ((m = text.match(/^dh\/dt = −ah \+ 1, h\(0\)=0\. Dashed line: steady state 1\/a = ([\d.]+)\.$/))) return 'dh/dt = −ah + 1，h(0)=0。虚线为稳态水位 1/a = ' + m[1] + '。';
  if ((m = text.match(/^(\d+) active$/))) return '激活 ' + m[1] + ' 个';
  if ((m = text.match(/^(.+) versus (.+)$/))) return figureText(m[1]) + '随' + figureText(m[2]) + '的变化';
  if ((m = text.match(/^(.+) by category$/))) return '按类别比较' + figureText(m[1]);
  if ((m = text.match(/^Causal mask\. Highlighted query (\d+) sees keys 1 through (\d+)$/))) return '因果掩码。当前查询位于第 ' + m[1] + ' 个位置，可参考前 ' + m[2] + ' 个键。';
  return value;
}
