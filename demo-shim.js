(() => {
  const realFetch = window.fetch.bind(window);
  const KEY = 'brill_case_demo_session';
  const plans = [
    {code:'solo',name:'Solo',monthly_ils:129,included_seats:1,storage_gb:10,trial_days:14,features:['clients','matters','calendar','tasks','documents','billing','client_portal']},
    {code:'team',name:'Team',monthly_ils:299,included_seats:3,storage_gb:50,trial_days:14,features:['clients','matters','calendar','tasks','documents','billing','client_portal','workflows','granular_permissions','corporate_mail','e_sign','data_import']},
    {code:'firm',name:'Firm',monthly_ils:649,included_seats:10,storage_gb:200,trial_days:14,features:['clients','matters','calendar','tasks','documents','billing','client_portal','workflows','granular_permissions','corporate_mail','e_sign','data_import','evidence_vault','legal_hold','dlp','advanced_audit','advanced_reports','official_integrations']},
    {code:'enterprise',name:'Enterprise',monthly_ils:1290,included_seats:25,storage_gb:1000,trial_days:14,features:['clients','matters','calendar','tasks','documents','billing','client_portal','workflows','granular_permissions','corporate_mail','e_sign','data_import','evidence_vault','legal_hold','dlp','advanced_audit','advanced_reports','official_integrations','custom_domain','white_label','api_access','sso','priority_support','dedicated_compute']}
  ];

  const json = (body, status=200) => new Response(JSON.stringify(body), {
    status,
    headers:{'content-type':'application/json'}
  });

  const getSession = () => {
    try { return JSON.parse(sessionStorage.getItem(KEY) || 'null'); } catch { return null; }
  };
  const setSession = value => sessionStorage.setItem(KEY, JSON.stringify(value));
  const clearSession = () => sessionStorage.removeItem(KEY);

  function demoFirm(planCode='firm', name='BRILL Legal Demo') {
    const plan = plans.find(p => p.code === planCode) || plans[2];
    const now = new Date();
    const trialEnd = new Date(now.getTime() + 14 * 86400000);
    return {
      id:'demo-firm-001',
      slug:'brill-legal-demo',
      display_name:name,
      legal_name:name,
      status:'active',
      country_code:'IL',
      default_language:'he',
      currency_code:'ILS',
      custom_domain:null,
      created_at:now.toISOString(),
      activated_at:now.toISOString(),
      membership_role:'owner',
      plan_code:plan.code,
      subscription_status:'trialing',
      trial_started_at:now.toISOString(),
      trial_ends_at:trialEnd.toISOString(),
      current_period_start:null,
      current_period_end:null,
      cancel_at_period_end:false,
      provisioning_status:'succeeded',
      provisioning_operation:'provision',
      provisioning_requested_at:now.toISOString(),
      provisioning_error:null,
      workspace_url:'./crm-preview.html',
      plan
    };
  }

  window.fetch = async (input, init={}) => {
    const url = typeof input === 'string' ? input : input?.url || '';
    if (!url.startsWith('/api/')) return realFetch(input, init);

    const method = String(init.method || 'GET').toUpperCase();
    let body = {};
    try { body = init.body ? JSON.parse(init.body) : {}; } catch {}

    if (url === '/api/plans') return json({trial_days:14,currency:'ILS',plans});

    if (url === '/api/me') {
      const session = getSession();
      if (!session) return json({authenticated:false});
      return json({authenticated:true,account:session.account,firms:session.firms});
    }

    if (url === '/api/register' && method === 'POST') {
      const firm = demoFirm(body.plan || 'firm', body.firm_name || 'BRILL Legal Demo');
      const session = {
        account:{
          id:'demo-account-001',
          email:body.email || 'owner@demo.local',
          full_name:body.full_name || 'Demo Owner',
          platform_role:'customer',
          status:'active',
          email_verified:true,
          created_at:new Date().toISOString(),
          last_login_at:new Date().toISOString()
        },
        firms:[firm]
      };
      setSession(session);
      return json({
        account:session.account,
        firm,
        subscription:{plan_code:firm.plan_code,status:'trialing',trial_started_at:firm.trial_started_at,trial_ends_at:firm.trial_ends_at},
        provisioning:{status:'succeeded',operation:'provision'},
        entitlement:firm.plan
      },201);
    }

    if (url === '/api/login' && method === 'POST') {
      const session = {
        account:{
          id:'demo-account-001',
          email:body.email || 'demo@brillcase.local',
          full_name:'Demo Owner',
          platform_role:'customer',
          status:'active',
          email_verified:true,
          created_at:new Date().toISOString(),
          last_login_at:new Date().toISOString()
        },
        firms:[demoFirm('firm')]
      };
      setSession(session);
      return json({ok:true,account:session.account});
    }

    if (url === '/api/logout' && method === 'POST') {
      clearSession();
      return json({ok:true});
    }

    const changePlan = url.match(/^\/api\/firms\/([^/]+)\/plan$/);
    if (changePlan && method === 'POST') {
      const session = getSession();
      if (!session) return json({error:'authentication_required'},401);
      const plan = plans.find(p => p.code === body.plan);
      if (!plan) return json({error:'invalid_plan'},400);
      session.firms = session.firms.map(f => f.id === changePlan[1] ? {...f,plan_code:plan.code,plan,provisioning_status:'succeeded'} : f);
      setSession(session);
      return json({ok:true,plan});
    }

    return json({error:'demo_endpoint_not_available'},404);
  };
})();