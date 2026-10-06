
const state={view:'dashboard',mobile:false};

const matters=[
{id:'2026-184',name:'State v. Cohen',client:'David Cohen',area:'Litigation',stage:'Discovery',risk:'High',owner:'Demo Owner',deadline:'07 Oct',status:'Active'},
{id:'2026-179',name:'Levi Holdings v. Northbridge',client:'Levi Holdings Ltd.',area:'Commercial',stage:'Motion',risk:'High',owner:'Demo Owner',deadline:'12 Oct',status:'Active'},
{id:'2026-176',name:'Amit Construction / Permit',client:'Amit Construction',area:'Administrative',stage:'Review',risk:'Medium',owner:'M. Levi',deadline:'14 Oct',status:'Active'},
{id:'2026-172',name:'Employment matter',client:'Private client',area:'Labour',stage:'Negotiation',risk:'Low',owner:'R. Cohen',deadline:'18 Oct',status:'Active'},
{id:'2026-161',name:'Real estate acquisition',client:'Orion Assets',area:'Real Estate',stage:'Due diligence',risk:'Low',owner:'Demo Owner',deadline:'23 Oct',status:'Active'}
];

const clients=[
{name:'Levi Holdings Ltd.',type:'Company',matters:3,contact:'David Levi',email:'office@levi.demo',balance:'₪8,900'},
{name:'Amit Construction',type:'Company',matters:2,contact:'Amit Bar',email:'legal@amit.demo',balance:'₪0'},
{name:'Orion Assets',type:'Company',matters:4,contact:'Noa Shaham',email:'noa@orion.demo',balance:'₪14,200'},
{name:'David Cohen',type:'Individual',matters:1,contact:'David Cohen',email:'david@demo.local',balance:'₪3,600'},
{name:'Private client',type:'Individual',matters:1,contact:'Restricted',email:'Protected',balance:'₪0'},
{name:'Negev Logistics',type:'Company',matters:2,contact:'Y. Ben Ami',email:'legal@negev.demo',balance:'₪5,100'}
];

const docs=[
{name:'evidence_12.pdf',matter:'2026-179',type:'PDF',size:'8.2 MB',status:'Legal Hold',hash:'8a3d0a2f91c7…d410',updated:'18:42'},
{name:'motion_response_draft.docx',matter:'2026-179',type:'DOC',size:'214 KB',status:'Working',hash:'—',updated:'Yesterday'},
{name:'court_notice_2026-10-04.pdf',matter:'2026-179',type:'PDF',size:'1.1 MB',status:'Verified',hash:'c19fe82a4d71…a92e',updated:'04 Oct'},
{name:'employment_agreement.pdf',matter:'2026-172',type:'PDF',size:'780 KB',status:'Verified',hash:'1b2c7738aa4e…f010',updated:'03 Oct'},
{name:'due_diligence_report.docx',matter:'2026-161',type:'DOC',size:'1.8 MB',status:'Working',hash:'—',updated:'02 Oct'}
];

function pill(text){
 const x=String(text).toLowerCase();
 let c='';
 if(x.includes('high')||x.includes('legal hold'))c='red';
 else if(x.includes('active')||x.includes('verified')||x.includes('paid'))c='green';
 else if(x.includes('medium')||x.includes('working')||x.includes('pending'))c='amber';
 else c='blue';
 return '<span class="pill '+c+'">'+text+'</span>';
}
function navButton(view,label,icon,count){
 return '<button data-view="'+view+'" class="'+(state.view===view?'active':'')+'"><span class="nav-icon">'+icon+'</span><span>'+label+'</span>'+(count?'<span class="nav-count">'+count+'</span>':'')+'</button>';
}
function shell(content,title,sub){
 return '<div class="demo-strip">BRILL CASE · PUBLIC PRODUCT DEMO · FICTIONAL DATA ONLY</div>'+
 '<div class="shell">'+
 '<aside class="sidebar" id="sidebar">'+
 '<div class="brand"><span class="brand-mark">BC</span><div class="brand-copy"><strong>BRILL CASE</strong><span>LEGAL PRACTICE OS</span></div></div>'+
 '<div class="workspace-meta"><small>WORKSPACE</small><strong>BRILL Legal Demo</strong><span>Jerusalem · Israel</span></div>'+
 '<nav class="nav"><div class="nav-label">WORK</div>'+
 navButton('dashboard','Dashboard','01','')+
 navButton('matters','Matters','02','42')+
 navButton('clients','Clients','03','186')+
 navButton('calendar','Calendar','04','')+
 navButton('documents','Documents','05','1.2k')+
 '<div class="nav-label">OPERATIONS</div>'+
 navButton('billing','Time & Billing','06','')+
 navButton('evidence','Evidence Vault','07','12')+
 navButton('audit','Audit Log','08','')+
 '<div class="nav-label">SYSTEM</div>'+
 navButton('settings','Settings','09','')+
 '</nav>'+
 '<div class="sidebar-foot"><div class="security-state"><i></i><span>Protected workspace · 2FA enabled</span></div><div class="user-card"><span class="user-avatar">DO</span><div><strong>Demo Owner</strong><span>Owner · Attorney</span></div></div></div>'+
 '</aside>'+
 '<main class="main"><header class="topbar"><div class="crumbs"><button class="icon-btn mobile-menu" id="menu">☰</button> BRILL Legal Demo <span>/</span> '+title+'</div><div class="top-actions"><button class="search">Search matters, clients, documents…</button><button class="icon-btn">RU</button><button class="icon-btn">?</button><div class="avatar">DO</div></div></header>'+
 '<div class="content"><div class="page-head"><div><h1>'+title+'</h1><p>'+sub+'</p></div><div class="page-actions"><button class="btn">Export</button><button class="btn primary">+ New</button></div></div>'+content+'</div></main></div>';
}
function dashboard(){
 const rows=matters.slice(0,4).map(function(m){return '<tr><td class="case-id">'+m.id+'</td><td><div class="entity"><strong>'+m.name+'</strong><span>'+m.client+'</span></div></td><td>'+m.area+'</td><td>'+m.stage+'</td><td>'+pill(m.risk)+'</td><td>'+m.deadline+'</td><td>'+m.owner+'</td></tr>'}).join('');
 const content=
 '<div class="summary"><div><span>Active matters</span><strong>42</strong><small>7 changed this week</small></div><div><span>Hard deadlines / 14d</span><strong>8</strong><small class="bad">2 require attention</small></div><div><span>Unbilled work</span><strong>₪84,600</strong><small>126.4 recorded hours</small></div><div><span>Evidence integrity</span><strong>100%</strong><small class="good">All hashes verified</small></div></div>'+
 '<div class="grid-2"><section class="panel"><div class="panel-head"><h2>Priority matters</h2><a data-view="matters">View all</a></div><div class="table-wrap"><table><thead><tr><th>Matter</th><th>Name</th><th>Area</th><th>Stage</th><th>Risk</th><th>Deadline</th><th>Owner</th></tr></thead><tbody>'+rows+'</tbody></table></div></section>'+
 '<section class="panel"><div class="panel-head"><h2>Upcoming deadlines</h2><span>Next 14 days</span></div><div class="panel-body"><div class="alert"><strong>Response to motion · 2026-179</strong><p>Hard deadline tomorrow at 10:00. Acknowledged by Demo Owner.</p></div><div class="deadline-list">'+
 '<div class="deadline-item"><div class="deadline-date"><b>07</b><span>OCT</span></div><div><strong>Response to motion</strong><small>2026-179 · Court filing</small></div>'+pill('High')+'</div>'+
 '<div class="deadline-item"><div class="deadline-date"><b>12</b><span>OCT</span></div><div><strong>Internal legal review</strong><small>2026-176 · Team review</small></div>'+pill('Medium')+'</div>'+
 '<div class="deadline-item"><div class="deadline-date"><b>14</b><span>OCT</span></div><div><strong>Administrative response</strong><small>2026-176 · Authority</small></div>'+pill('Medium')+'</div>'+
 '<div class="deadline-item"><div class="deadline-date"><b>21</b><span>OCT</span></div><div><strong>Court hearing</strong><small>2026-179 · District Court</small></div>'+pill('High')+'</div></div></div></section></div>'+
 '<div class="grid-2 section-gap"><section class="panel"><div class="panel-head"><h2>Recent activity</h2><span>Audit-linked</span></div><div class="panel-body"><div class="timeline">'+
 '<div class="timeline-row"><time>18:42</time><i></i><div><strong>Evidence version verified</strong><p>evidence_12.pdf · v4 · Legal Hold remains active</p></div></div>'+
 '<div class="timeline-row"><time>16:10</time><i></i><div><strong>Client portal message received</strong><p>Levi Holdings confirmed participants for next hearing</p></div></div>'+
 '<div class="timeline-row"><time>12:18</time><i></i><div><strong>Hard deadline acknowledged</strong><p>Demo Owner accepted responsibility for filing deadline</p></div></div>'+
 '<div class="timeline-row"><time>09:04</time><i></i><div><strong>Payment recorded</strong><p>Invoice INV-2026-104 · ₪12,400</p></div></div></div></div></section>'+
 '<section class="panel"><div class="panel-head"><h2>Today</h2><span>Wednesday · 07 Oct</span></div><div class="panel-body"><div class="deadline-list">'+
 '<div class="deadline-item"><div class="deadline-date"><b>09</b><span>30</span></div><div><strong>Hearing preparation</strong><small>2026-184 · Conference room 2</small></div><span>60 min</span></div>'+
 '<div class="deadline-item"><div class="deadline-date"><b>12</b><span>00</span></div><div><strong>Client meeting</strong><small>Levi Holdings · Office</small></div><span>45 min</span></div>'+
 '<div class="deadline-item"><div class="deadline-date"><b>15</b><span>30</span></div><div><strong>Internal case review</strong><small>2026-179 · Team</small></div><span>30 min</span></div></div></div></section></div>';
 return shell(content,'Dashboard','Operational view of matters, deadlines and firm activity.');
}
function mattersView(){
 const rows=matters.map(function(m){return '<tr><td class="case-id">'+m.id+'</td><td><div class="entity"><strong>'+m.name+'</strong><span>'+m.client+'</span></div></td><td>'+m.area+'</td><td>'+m.stage+'</td><td>'+pill(m.risk)+'</td><td>'+m.deadline+'</td><td>'+m.owner+'</td><td>'+pill(m.status)+'</td></tr>'}).join('');
 const content='<div class="filters"><input placeholder="Search matters"><select><option>All practice areas</option><option>Commercial</option><option>Litigation</option></select><select><option>All owners</option><option>Demo Owner</option></select><div class="spacer"></div><button class="btn">Columns</button><button class="btn">Filters</button></div><section class="panel"><div class="panel-head"><h2>All matters</h2><span>42 active · 11 archived</span></div><div class="table-wrap"><table><thead><tr><th>Matter</th><th>Name / Client</th><th>Area</th><th>Stage</th><th>Risk</th><th>Next deadline</th><th>Owner</th><th>Status</th></tr></thead><tbody>'+rows+'</tbody></table></div></section>';
 return shell(content,'Matters','Case portfolio with ownership, risk, stage and deadline control.');
}
function clientsView(){
 const cards=clients.map(function(c){return '<article class="client-card"><div class="client-card-top"><div><h3>'+c.name+'</h3><p>'+c.type+'</p></div>'+pill(c.matters>2?'Active':'Current')+'</div><div class="client-meta"><div><span>Open matters</span><strong>'+c.matters+'</strong></div><div><span>Balance</span><strong>'+c.balance+'</strong></div><div><span>Contact</span><strong>'+c.contact+'</strong></div><div><span>Email</span><strong>'+c.email+'</strong></div></div></article>'}).join('');
 return shell('<div class="filters"><input placeholder="Search clients"><select><option>All client types</option></select><div class="spacer"></div><button class="btn">Import</button></div><div class="client-grid">'+cards+'</div>','Clients','Client records, relationships, balances and linked matters.');
}
function calendarView(){
 const heads=['','Mon 05','Tue 06','Wed 07','Thu 08','Fri 09'].map(function(x){return '<div class="cal-cell cal-head">'+x+'</div>'}).join('');
 const times=['09:00','10:00','11:00','12:00','13:00','14:00','15:00'].map(function(t,i){
   let cells='<div class="cal-cell cal-time">'+t+'</div>';
   for(let d=1;d<=5;d++){
     let ev='';
     if(i===0&&d===3)ev='<div class="event red">Hearing prep<br>2026-184</div>';
     if(i===3&&d===3)ev='<div class="event">Client meeting<br>Levi Holdings</div>';
     if(i===6&&d===3)ev='<div class="event green">Case review<br>2026-179</div>';
     if(i===2&&d===4)ev='<div class="event">Deadline review<br>Team</div>';
     cells+='<div class="cal-cell">'+ev+'</div>';
   }
   return cells;
 }).join('');
 return shell('<div class="filters"><button class="btn">←</button><button class="btn">Today</button><button class="btn">→</button><div class="spacer"></div><select><option>Work week</option></select></div><div class="calendar">'+heads+times+'</div>','Calendar','Court dates, meetings, deadlines and internal work.');
}
function documentsView(){
 const rows=docs.map(function(d){return '<div class="file-row"><span class="file-type '+(d.type==='PDF'?'pdf':'')+'">'+d.type+'</span><div><strong>'+d.name+'</strong><small>Matter '+d.matter+' · '+d.size+'</small></div><span class="hash">'+d.hash+'</span><div>'+pill(d.status)+'</div><time>'+d.updated+'</time></div>'}).join('');
 return shell('<div class="filters"><input placeholder="Search documents"><select><option>All matters</option></select><select><option>All security states</option></select><div class="spacer"></div><button class="btn primary">Upload document</button></div><section class="panel"><div class="panel-head"><h2>Document library</h2><span>1,284 files · 18.6 GB</span></div><div class="panel-body file-list">'+rows+'</div></section>','Documents','Matter documents, versions and evidence-aware file controls.');
}
function billingView(){
 const inv='<tr><td>INV-2026-104</td><td><div class="entity"><strong>Levi Holdings Ltd.</strong><span>2026-179</span></div></td><td>₪12,400</td><td>06 Oct</td><td>'+pill('Paid')+'</td></tr>'+
 '<tr><td>INV-2026-101</td><td><div class="entity"><strong>Orion Assets</strong><span>2026-161</span></div></td><td>₪14,200</td><td>30 Sep</td><td>'+pill('Pending')+'</td></tr>'+
 '<tr><td>INV-2026-098</td><td><div class="entity"><strong>David Cohen</strong><span>2026-184</span></div></td><td>₪3,600</td><td>26 Sep</td><td>'+pill('Pending')+'</td></tr>';
 const content='<div class="money-grid"><div><span>Unbilled work</span><strong>₪84,600</strong></div><div><span>Open invoices</span><strong>₪26,700</strong></div><div><span>Collected / month</span><strong>₪112,400</strong></div><div><span>Billable hours</span><strong>126.4h</strong></div></div><section class="panel section-gap"><div class="panel-head"><h2>Invoices</h2><span>October 2026</span></div><div class="table-wrap"><table><thead><tr><th>Invoice</th><th>Client / Matter</th><th>Amount</th><th>Date</th><th>Status</th></tr></thead><tbody>'+inv+'</tbody></table></div></section>';
 return shell(content,'Time & Billing','Time entries, invoices, payments and matter financials.');
}
function evidenceView(){
 const rows='<tr><td>EV-012</td><td><div class="entity"><strong>evidence_12.pdf</strong><span>2026-179 · v4</span></div></td><td>'+pill('Legal Hold')+'</td><td class="hash">8a3d0a2f91c7…d410</td><td>47 events</td><td>18:42</td></tr>'+
 '<tr><td>EV-009</td><td><div class="entity"><strong>signed_statement.pdf</strong><span>2026-184 · v1</span></div></td><td>'+pill('Verified')+'</td><td class="hash">f771a052c833…91c2</td><td>19 events</td><td>05 Oct</td></tr>'+
 '<tr><td>EV-004</td><td><div class="entity"><strong>inspection_photos.zip</strong><span>2026-176 · v2</span></div></td><td>'+pill('Verified')+'</td><td class="hash">31ca98b8c140…fe28</td><td>12 events</td><td>02 Oct</td></tr>';
 const content='<div class="evidence-head"><div><h2>Evidence Vault integrity</h2><p>Critical case materials are hashed, versioned and tracked through chain of custody.</p></div><div class="integrity"><strong>100%</strong><span>verified</span></div></div><section class="panel"><div class="panel-head"><h2>Evidence items</h2><span>12 protected items</span></div><div class="table-wrap"><table><thead><tr><th>ID</th><th>Evidence</th><th>Protection</th><th>SHA-256</th><th>Chain</th><th>Verified</th></tr></thead><tbody>'+rows+'</tbody></table></div></section>';
 return shell(content,'Evidence Vault','Legal Hold, cryptographic integrity and chain-of-custody tracking.');
}
function auditView(){
 const events=[
 ['06 Oct · 18:42','Demo Owner','Evidence version verified','2026-179 / EV-012'],
 ['06 Oct · 16:10','Client Portal','Message received','Levi Holdings Ltd.'],
 ['06 Oct · 12:18','Demo Owner','Deadline acknowledged','2026-179 / hard deadline'],
 ['06 Oct · 09:04','Finance','Payment recorded','INV-2026-104 / ₪12,400'],
 ['05 Oct · 17:55','M. Levi','Document uploaded','2026-179 / motion draft'],
 ['05 Oct · 14:32','System','Matter risk changed','2026-184 / Medium → High']
 ];
 const rows=events.map(function(e){return '<div class="audit-row"><time>'+e[0]+'</time><strong>'+e[1]+'</strong><div>'+e[2]+'</div><span>'+e[3]+'</span></div>'}).join('');
 return shell('<div class="filters"><input placeholder="Search audit events"><select><option>All event types</option></select><select><option>All users</option></select></div><section class="panel"><div class="panel-head"><h2>Audit trail</h2><span>Immutable operational history</span></div><div class="panel-body audit-list">'+rows+'</div></section>','Audit Log','Traceable history of security-sensitive and operational actions.');
}
function settingsView(){
 const content='<div class="settings-grid"><div class="settings-menu"><button class="active">Workspace</button><button>Users & roles</button><button>Security</button><button>Client portal</button><button>Mail</button><button>Integrations</button><button>Billing</button></div><section class="panel"><div class="panel-head"><h2>Workspace settings</h2><span>BRILL Legal Demo</span></div><div class="panel-body">'+
 '<div class="setting-row"><div><strong>Two-factor authentication</strong><p>Require 2FA for every attorney and staff account.</p></div><span class="toggle on"></span></div>'+
 '<div class="setting-row"><div><strong>Session protection</strong><p>Restrict concurrent sessions and revoke suspicious activity.</p></div><span class="toggle on"></span></div>'+
 '<div class="setting-row"><div><strong>Evidence Vault</strong><p>Enable hashing, version tracking and Legal Hold controls.</p></div><span class="toggle on"></span></div>'+
 '<div class="setting-row"><div><strong>Client portal</strong><p>Allow secure client messages and document exchange.</p></div><span class="toggle on"></span></div>'+
 '<div class="setting-row"><div><strong>External sharing</strong><p>Allow public links to documents outside the firm.</p></div><span class="toggle"></span></div>'+
 '</div></section></div>';
 return shell(content,'Settings','Workspace, security and operational policy configuration.');
}
function render(){
 let html='';
 if(state.view==='dashboard')html=dashboard();
 if(state.view==='matters')html=mattersView();
 if(state.view==='clients')html=clientsView();
 if(state.view==='calendar')html=calendarView();
 if(state.view==='documents')html=documentsView();
 if(state.view==='billing')html=billingView();
 if(state.view==='evidence')html=evidenceView();
 if(state.view==='audit')html=auditView();
 if(state.view==='settings')html=settingsView();
 document.getElementById('app').innerHTML=html;
 document.querySelectorAll('[data-view]').forEach(function(el){el.addEventListener('click',function(){state.view=el.getAttribute('data-view');render();window.scrollTo(0,0)})});
 const menu=document.getElementById('menu');
 if(menu)menu.addEventListener('click',function(){document.getElementById('sidebar').classList.toggle('open')});
}
render();
