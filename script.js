const bank = [
  {grade:'中学1年',group:'middle',topic:'be動詞',level:'初級',q:'I ___ a student.',translation:'私は学生です。',choices:['am','is','are','be'],answer:0,explain:'主語が I のとき、be動詞は am を使います。'},
  {grade:'中学1年',group:'middle',topic:'一般動詞',level:'初級',q:'She ___ tennis every Sunday.',translation:'彼女は毎週日曜日にテニスをします。',choices:['play','plays','playing','is play'],answer:1,explain:'主語が三人称単数（she）で現在の文なので、動詞に -s をつけます。'},
  {grade:'中学2年',group:'middle',topic:'過去形',level:'初級',q:'We ___ a movie last night.',translation:'私たちは昨夜、映画を見ました。',choices:['watch','watched','watches','watching'],answer:1,explain:'last night（昨夜）があるので過去形。watch の過去形は watched です。'},
  {grade:'中学2年',group:'middle',topic:'不定詞',level:'初級',q:'I want ___ a doctor.',translation:'私は医者になりたいです。',choices:['be','being','to be','been'],answer:2,explain:'「〜になりたい」は want to be。want の後ろは to + 動詞の原形です。'},
  {grade:'中学3年',group:'middle',topic:'現在完了',level:'中級',q:'I have ___ to Kyoto twice.',translation:'私は京都に2回行ったことがあります。',choices:['be','went','been','go'],answer:2,explain:'経験を表す現在完了は have + 過去分詞。go の過去分詞は been です。'},
  {grade:'高校1年',group:'high1',topic:'文型',level:'中級',q:'My father gave ___ a new watch.',translation:'父は私に新しい腕時計をくれました。',choices:['I','my','me','mine'],answer:2,explain:'give は「人に物を与える」という第4文型（give + 人 + 物）。目的格の me を使います。'},
  {grade:'高校1年',group:'high1',topic:'助動詞',level:'中級',q:'You ___ have told me earlier.',translation:'もっと早く私に言ってくれればよかったのに。',choices:['should','can','may','will'],answer:0,explain:'should have + 過去分詞で「〜すべきだったのに（実際はしなかった）」という過去への後悔を表します。'},
  {grade:'高校1年',group:'high1',topic:'受動態',level:'中級',q:'This novel ___ by millions of people.',translation:'この小説は何百万人もの人に読まれています。',choices:['reads','is read','is reading','has read'],answer:1,explain:'「読まれる」という受け身は be動詞 + 過去分詞。主語が単数なので is read です。'},
  {grade:'高校2年',group:'high2',topic:'関係詞',level:'中級',q:'The woman ___ lives next door is a pianist.',translation:'隣に住んでいる女性はピアニストです。',choices:['which','whose','who','where'],answer:2,explain:'先行詞が人（The woman）で、後ろに動詞 lives が続くので主格の関係代名詞 who が適切です。'},
  {grade:'高校2年',group:'high2',topic:'仮定法',level:'上級',q:'If I ___ you, I would accept the offer.',translation:'もし私があなたなら、その申し出を受けるでしょう。',choices:['am','were','will be','have been'],answer:1,explain:'現在の事実と異なる仮定を表す仮定法過去では、be動詞は主語にかかわらず were を使うのが基本です。'},
  {grade:'高校2年',group:'high2',topic:'分詞構文',level:'上級',q:'___ the news, she burst into tears.',translation:'その知らせを聞いて、彼女はわっと泣き出しました。',choices:['Hear','Heard','Hearing','To hear'],answer:2,explain:'「その知らせを聞いて」は分詞構文。主語 she が聞く側なので現在分詞 Hearing で始めます。'},
  {grade:'高校3年',group:'high3',topic:'倒置',level:'上級',q:'Rarely ___ such a beautiful sunset.',translation:'こんなに美しい夕日を見ることはめったにありません。',choices:['I have seen','have I seen','I saw','did I saw'],answer:1,explain:'否定語 Rarely が文頭に出ると倒置が起こり、助動詞 have が主語 I の前に来ます。'},
  {grade:'高校3年',group:'high3',topic:'比較',level:'上級',q:'The more you practice, ___ you become.',translation:'練習すればするほど、上達します。',choices:['better','the better','you are better','the best'],answer:1,explain:'「〜すればするほど…」は the + 比較級, the + 比較級。後半も the better です。'},
  {grade:'高校3年',group:'high3',topic:'仮定法',level:'上級',q:'I wish I ___ more time to study.',translation:'もっと勉強する時間があればいいのに。',choices:['have','will have','had','would have'],answer:2,explain:'現在の事実に反する願望を表す I wish の後ろは仮定法過去。have の過去形 had を使います。'}
];

const $ = (id) => document.getElementById(id);
let filter = 'all', round = [], index = 0, selected = null, roundCorrect = 0;
let stats = {correct:0,streak:0,xp:0,...JSON.parse(localStorage.getItem('gq-stats') || '{}')};
let soundOn = false;
const keyNames = ['A','B','C','D'];

function persist(){ localStorage.setItem('gq-stats', JSON.stringify(stats)); }
function paintStats(){ $('correctStat').innerHTML = `${stats.correct} <small>問</small>`; $('streakStat').innerHTML = `${stats.streak} <small>回</small>`; $('totalXpStat').innerHTML = `${stats.xp} <small>XP</small>`; $('xpLabel').textContent = `${stats.xp % 100} / 100 XP`; $('xpFill').style.width = `${stats.xp % 100}%`; }
function shuffle(list){ return [...list].sort(()=>Math.random()-.5); }
function startRound(){
  const available = bank.filter(item => filter === 'all' || item.group === filter);
  round = shuffle(available).slice(0, Math.min(5, available.length)); index=0; roundCorrect=0; renderQuestion();
  $('questionTotal').textContent = String(round.length).padStart(2,'0');
}
function renderQuestion(){
  const item=round[index]; selected=null;
  $('nextButton').dataset.mode='';
  $('questionNumber').textContent=String(index+1).padStart(2,'0');
  $('quizProgress').style.width=`${(index/round.length)*100}%`;
  $('gradeChip').textContent=item.grade; $('topicLabel').textContent=item.topic;
  $('questionText').textContent=item.q; $('translationText').textContent=item.translation;
  const difficultyDots = item.level === '初級' ? '●' : item.level === '中級' ? '●●' : '●●●';
  document.querySelector('.difficulty').innerHTML=`<span>${difficultyDots}</span> ${item.level}`;
  const answers=$('answers'); answers.innerHTML='';
  item.choices.forEach((choice,i)=>{const button=document.createElement('button');button.className='answer-option';button.innerHTML=`<span class="answer-key">${keyNames[i]}</span><span>${choice}</span>`;button.addEventListener('click',()=>choose(i));answers.append(button);});
  $('feedback').hidden=true; $('feedback').className='feedback'; $('nextButton').disabled=true; $('nextButton').innerHTML='回答を選ぶ <span>→</span>';
}
function choose(i){
  if(selected!==null)return; selected=i;
  const item=round[index], correct=i===item.answer;
  [...$('answers').children].forEach((button,n)=>{button.disabled=true;if(n===item.answer)button.classList.add('correct');if(n===i&&!correct)button.classList.add('incorrect');});
  const feedback=$('feedback');feedback.hidden=false;feedback.classList.toggle('wrong',!correct);
  feedback.innerHTML=`<strong>${correct?'✦ 正解！':'もう一歩！'}</strong>${item.explain}`;
  if(correct){roundCorrect++;stats.correct++;stats.streak++;stats.xp+=20;}else stats.streak=0;
  persist();paintStats();playTone(correct?660:300);
  $('nextButton').disabled=false;$('nextButton').innerHTML=index===round.length-1?'結果を見る <span>→</span>':'次の問題へ <span>→</span>';
}
function finishRound(){
  $('quizProgress').style.width='100%';
  const pct=Math.round(roundCorrect/round.length*100);
  $('gradeChip').textContent='QUEST CLEAR';$('topicLabel').textContent='今回の結果';
  $('questionText').textContent=pct===100?'パーフェクト！':pct>=60?'よくできました！':'挑戦おつかれさま！';
  $('translationText').textContent=`${round.length}問中 ${roundCorrect}問正解 · ${roundCorrect*20} XP獲得`;
  $('answers').innerHTML=`<div class="result-box"><span>🎉</span><b>${pct}%</b><small>正答率</small></div><div class="result-message">${pct>=60?'今日の一歩、しっかり積み上がったね。':'解説を見直して、もう一度チャレンジ！'}</div>`;
  $('feedback').hidden=true;$('nextButton').disabled=false;$('nextButton').innerHTML='もう一度遊ぶ <span>↻</span>';
  $('nextButton').dataset.mode='restart';
}
function advance(){if($('nextButton').dataset.mode==='restart'){$('nextButton').dataset.mode='';startRound();return;}if(index<round.length-1){index++;renderQuestion();}else finishRound();}
function playTone(freq){if(!soundOn)return;try{const ctx=new (window.AudioContext||window.webkitAudioContext)(),o=ctx.createOscillator(),g=ctx.createGain();o.frequency.value=freq;o.type='sine';g.gain.value=.045;o.connect(g);g.connect(ctx.destination);o.start();o.stop(ctx.currentTime+.12);}catch(e){}}
$('nextButton').addEventListener('click',advance);
document.querySelectorAll('.topic-card').forEach(card=>card.addEventListener('click',()=>{document.querySelectorAll('.topic-card').forEach(c=>c.classList.remove('active'));card.classList.add('active');filter=card.dataset.filter;startRound();document.getElementById('play').scrollIntoView({behavior:'smooth'});}));
$('soundToggle').addEventListener('click',()=>{soundOn=!soundOn;$('soundToggle').setAttribute('aria-pressed',String(soundOn));$('soundToggle').querySelector('span:last-child').textContent=`サウンド ${soundOn?'ON':'OFF'}`;playTone(520);});
document.addEventListener('keydown',e=>{if(['1','2','3','4'].includes(e.key)&&selected===null){choose(Number(e.key)-1);}else if((e.key==='Enter'||e.key===' ')&&!$('nextButton').disabled&&document.activeElement!==$('nextButton')){e.preventDefault();$('nextButton').click();}});
paintStats();startRound();
