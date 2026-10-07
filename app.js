
const matters=[
{id:'2026-179',title:'Levi Holdings v. Northbridge',client:'Levi Holdings Ltd.',area:'Commercial Litigation',risk:'high',stage:'Motion',deadline:'07 Oct · 10:00',court:'Jerusalem District Court',lead:'Demo Owner'},
{id:'2026-184',title:'State v. Cohen',client:'David Cohen',area:'Litigation',risk:'high',stage:'Discovery',deadline:'09 Oct · 09:30',court:'Jerusalem Magistrate Court',lead:'Demo Owner'},
{id:'2026-176',title:'Amit Construction / Permit',client:'Amit Construction',area:'Administrative',risk:'medium',stage:'Authority Review',deadline:'12 Oct · 14:30',court:'Administrative Authority',lead:'M. Levi'},
{id:'2026-172',title:'Employment Matter',client:'Private Client',area:'Labour',risk:'low',stage:'Negotiation',deadline:'18 Oct · 11:00',court:'Labour Court',lead:'R. Cohen'},
{id:'2026-161',title:'Orion Assets Acquisition',client:'Orion Assets',area:'Real Estate',risk:'low',stage:'Due Diligence',deadline:'23 Oct · 16:00',court:'Private Transaction',lead:'Demo Owner'}
];
let selected=0;
let tab='overview';

function el(q){return document.querySelector(q)}
function all(q){return [...document.querySelectorAll(q)]}
function badge(text,type=''){return '<span class="badge '+type+'">'+text+'</span>'}

function rail(){
 return '<aside class="rail">'+
 '<div class="logo">BC</div>'+
 '<nav class="rail-nav">'+
 '<button class="rail-btn active" title="Matter Desk">MD</button>'+
 '<button class="rail-btn" title="Clients">CL</button>'+
 '<button class="rail-btn" title="Calendar">CA</button>'+
 '<button class="rail-btn" title="Documents">DO</button>'+
 '<button class="rail-btn" title="Finance">FI</button>'+
 '<button class="rail-btn" title="Evidence">EV</button>'+
 '</nav>'+
 '<div class="rail-spacer"></div><button class="rail-btn" title="Settings">ST</button><div class="rail-avatar">DO</div>'+
 '</aside>';
}
function matterPane(){
 return '<aside class="matters">'+
 '<div class="matters-head"><strong>Matters</strong><button>＋</button></div>'+
 '<div class="matter-search"><input id="matterSearch" placeholder="Search matters"></div>'+
 '<div class="matter-list">'+matters.map((m,i)=>'<button class="matter-item '+(i===selected?'active':'')+'" data-matter="'+i+'">'+
 '<div class="matter-line"><span class="matter-no">'+m.id+'</span><i class="risk-dot '+m.risk+'"></i></div>'+
 '<h3>'+m.title+'</h3><p>'+m.client+' · '+m.area+'</p>'+
 '<div class="matter-foot"><span>'+m.stage+'</span><span>'+m.deadline+'</span></div></button>').join('')+'</div>'+
 '</aside>';
}
function top(){
 return '<div class="globalbar"><button class="top-icon mobile-matters">☰</button><button class="global-search">Search across matters, clients, documents…</button><div class="global-spacer"></div><span class="demo-tag">PUBLIC DEMO</span><button class="top-icon">RU</button><button class="top-icon">?</button></div>';
}
function caseHeader(m){
 return '<header class="case-head"><div class="case-kicker">'+m.area+' · MATTER '+m.id+'</div>'+
 '<div class="case-title-row"><div><h1>'+m.title+'</h1><div class="case-meta"><span class="status">Active</span><span>'+m.court+'</span><span>Lead: '+m.lead+'</span><span>Client: '+m.client+'</span></div></div>'+
 '<div class="case-actions"><button>Export</button><button>Share</button><button class="primary">Add activity</button></div></div></header>'+
 '<nav class="tabs">'+['overview','documents','timeline','billing','evidence'].map(t=>'<button class="tab '+(tab===t?'active':'')+'" data-tab="'+t+'">'+({overview:'Overview',documents:'Documents',timeline:'Timeline',billing:'Billing',evidence:'Evidence'}[t])+'</button>').join('')+'</nav>';
}
function overview(m){
 return '<div class="deadline-banner"><div><small>NEXT CRITICAL ACTION</small><strong>Response to motion must be filed tomorrow at 10:00</strong><span>Acknowledged by '+m.lead+' · filing package incomplete</span></div><div class="deadline-count"><b>14h</b><span>remaining</span></div></div>'+
 '<section class="section"><div class="section-head"><h2>Matter dossier</h2><button>Edit matter</button></div><div class="fact-grid">'+
 '<div class="fact"><span>Client</span><strong>'+m.client+'</strong></div><div class="fact"><span>Practice area</span><strong>'+m.area+'</strong></div><div class="fact"><span>Stage</span><strong>'+m.stage+'</strong></div>'+
 '<div class="fact"><span>Court / forum</span><strong>'+m.court+'</strong></div><div class="fact"><span>Lead counsel</span><strong>'+m.lead+'</strong></div><div class="fact"><span>Opened</span><strong>18 Aug 2026</strong></div>'+
 '</div></section>'+
 '<section class="section"><div class="section-head"><h2>Recent work</h2><span>Audit-linked activity</span></div><div class="activity-list">'+
 activityRows()+'</div></section>'+
 '<section class="section"><div class="section-head"><h2>Recent documents</h2><button data-tab="documents">Open all</button></div><div class="document-list">'+docRows(3)+'</div></section>';
}
function activityRows(){
 const rows=[
 ['18:42','Evidence version verified','evidence_12.pdf · v4 · SHA-256 matched','Demo Owner'],
 ['16:10','Client message received','Participants confirmed for the next hearing','Client Portal'],
 ['12:18','Deadline acknowledged','Hard deadline accepted by responsible counsel','Demo Owner'],
 ['09:04','Payment recorded','Invoice INV-2026-104 · ₪12,400','Finance'],
 ['Yesterday','Draft uploaded','motion_response_draft.docx · version 2','M. Levi']
 ];
 return rows.map(r=>'<div class="activity-row"><time>'+r[0]+'</time><i class="activity-dot"></i><div><strong>'+r[1]+'</strong><p>'+r[2]+'</p></div><em>'+r[3]+'</em></div>').join('');
}
function docRows(limit=5){
 const docs=[
 ['PDF','evidence_12.pdf','Evidence Vault · v4 · 8.2 MB','8a3d0a2f91c7…d410','Legal Hold','18:42'],
 ['DOC','motion_response_draft.docx','Working document · v2 · 214 KB','—','Working','Yesterday'],
 ['PDF','court_notice_2026-10-04.pdf','Court filing · signed · 1.1 MB','c19fe82a4d71…a92e','Verified','04 Oct'],
 ['PDF','witness_statement_signed.pdf','Evidence · v1 · 2.4 MB','f771a052c833…91c2','Verified','03 Oct'],
 ['XLS','damages_schedule.xlsx','Working analysis · v7 · 860 KB','—','Working','02 Oct']
 ];
 return docs.slice(0,limit).map(d=>'<div class="doc-row"><span class="doc-type '+(d[0]==='PDF'?'pdf':'')+'">'+d[0]+'</span><div><strong>'+d[1]+'</strong><small>'+d[2]+'</small></div><span class="hash">'+d[3]+'</span><div>'+badge(d[4],d[4]==='Legal Hold'?'hold':d[4]==='Verified'?'ok':'')+'</div><time>'+d[5]+'</time></div>').join('');
}
function documents(){
 return '<section class="section"><div class="section-head"><h2>Documents</h2><span>38 files · 12 evidence-linked</span></div><div class="document-list">'+docRows(5)+'</div></section>'+
 '<section class="section"><div class="section-head"><h2>Document controls</h2><span>Matter-level policy</span></div><div class="fact-grid"><div class="fact"><span>External sharing</span><strong>Disabled</strong></div><div class="fact"><span>Version retention</span><strong>Unlimited</strong></div><div class="fact"><span>Evidence hashing</span><strong>Enabled</strong></div></div></section>';
}
function timeline(){
 return '<section class="section"><div class="section-head"><h2>Matter timeline</h2><span>Full operational history</span></div><div class="activity-list">'+activityRows()+activityRows()+'</div></section>';
}
function billing(){
 return '<div class="money-line"><div><span>Unbilled work</span><strong>₪18,450</strong></div><div><span>Billed</span><strong>₪42,300</strong></div><div><span>Outstanding</span><strong>₪8,900</strong></div><div><span>Time</span><strong>34.2h</strong></div></div>'+
 '<section class="section"><div class="section-head"><h2>Recent time entries</h2><span>October 2026</span></div><div class="activity-list">'+
 '<div class="activity-row"><time>06 Oct</time><i class="activity-dot"></i><div><strong>Motion response review</strong><p>2.4h · '+matters[selected].lead+'</p></div><em>₪2,880</em></div>'+
 '<div class="activity-row"><time>05 Oct</time><i class="activity-dot"></i><div><strong>Evidence review</strong><p>1.8h · M. Levi</p></div><em>₪1,710</em></div>'+
 '<div class="activity-row"><time>04 Oct</time><i class="activity-dot"></i><div><strong>Client conference</strong><p>0.9h · '+matters[selected].lead+'</p></div><em>₪1,080</em></div></div></section>';
}
function evidence(){
 return '<section class="section"><div class="section-head"><h2>Evidence Vault</h2><span>12 protected items</span></div><div class="document-list">'+
 '<div class="doc-row"><span class="doc-type pdf">PDF</span><div><strong>evidence_12.pdf</strong><small>EV-012 · version 4 · 47 chain events</small></div><span class="hash">8a3d0a2f91c7…d410</span><div>'+badge('Legal Hold','hold')+'</div><time>18:42</time></div>'+
 '<div class="doc-row"><span class="doc-type pdf">PDF</span><div><strong>witness_statement_signed.pdf</strong><small>EV-009 · version 1 · 19 chain events</small></div><span class="hash">f771a052c833…91c2</span><div>'+badge('Verified','ok')+'</div><time>05 Oct</time></div></div></section>'+
 '<section class="section"><div class="section-head"><h2>Custody policy</h2><span>Cryptographic controls</span></div><div class="fact-grid"><div class="fact"><span>Legal Hold</span><strong>Active</strong></div><div class="fact"><span>Hash algorithm</span><strong>SHA-256</strong></div><div class="fact"><span>Integrity</span><strong>100% verified</strong></div></div></section>';
}
function center(m){
 let body=tab==='overview'?overview(m):tab==='documents'?documents():tab==='timeline'?timeline():tab==='billing'?billing():evidence();
 return '<main class="case">'+top()+caseHeader(m)+'<div class="case-body">'+body+'</div></main>';
}
function rightbar(m){
 return '<aside class="rightbar">'+
 '<section class="right-block"><header><h3>Next dates</h3><span>14 days</span></header>'+
 '<div class="next-row"><div class="next-date"><b>07</b><span>OCT</span></div><div><strong>Response to motion</strong><small>10:00 · Hard deadline</small></div></div>'+
 '<div class="next-row"><div class="next-date"><b>12</b><span>OCT</span></div><div><strong>Internal legal review</strong><small>14:30 · Team</small></div></div>'+
 '<div class="next-row"><div class="next-date"><b>21</b><span>OCT</span></div><div><strong>Court hearing</strong><small>09:00 · '+m.court+'</small></div></div></section>'+
 '<section class="right-block"><header><h3>People</h3><span>5 linked</span></header>'+
 '<div class="person"><span class="person-avatar">LH</span><div><strong>'+m.client+'</strong><small>Client</small></div></div>'+
 '<div class="person"><span class="person-avatar">NS</span><div><strong>Northbridge Systems</strong><small>Opposing party</small></div></div>'+
 '<div class="person"><span class="person-avatar">DO</span><div><strong>'+m.lead+'</strong><small>Lead counsel</small></div></div></section>'+
 '<section class="right-block"><header><h3>Evidence integrity</h3><span>Vault</span></header><div class="integrity-score"><strong>100%</strong><span>verified</span></div>'+
 '<div class="kv"><span>Legal Hold</span><b>Active</b></div><div class="kv"><span>Evidence items</span><b>12</b></div><div class="kv"><span>Chain events</span><b>47</b></div><div class="kv"><span>Last check</span><b>2 min ago</b></div><button class="right-action" data-tab="evidence">OPEN EVIDENCE VAULT</button></section>'+
 '<section class="right-block"><header><h3>Matter finance</h3><span>Live</span></header><div class="kv"><span>Unbilled</span><b>₪18,450</b></div><div class="kv"><span>Outstanding</span><b>₪8,900</b></div><div class="kv"><span>Time / month</span><b>34.2h</b></div></section>'+
 '</aside>';
}
function render(){
 const m=matters[selected];
 document.getElementById('app').innerHTML='<div class="workspace">'+rail()+matterPane()+center(m)+rightbar(m)+'</div>';
 all('[data-matter]').forEach(b=>b.onclick=()=>{selected=Number(b.dataset.matter);tab='overview';render()});
 all('[data-tab]').forEach(b=>b.onclick=()=>{tab=b.dataset.tab;render()});
 const search=el('#matterSearch');
 if(search)search.oninput=()=>{
   const q=search.value.toLowerCase();
   all('.matter-item').forEach((b,i)=>b.style.display=(matters[i].title+' '+matters[i].client+' '+matters[i].id).toLowerCase().includes(q)?'block':'none');
 };
}
render();
