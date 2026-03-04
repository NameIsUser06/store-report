'use client'
import { useState } from 'react'

const S: Record<string, React.CSSProperties> = {
  // layout
  wrap:    { maxWidth: 1040, margin: '0 auto', padding: '0 clamp(20px,5vw,64px)' },
  section: { borderTop: '1px solid var(--line)', padding: 'clamp(72px,9vw,112px) clamp(20px,5vw,64px)' },
  sectionAlt: { borderTop: '1px solid var(--line)', padding: 'clamp(72px,9vw,112px) clamp(20px,5vw,64px)', background: 'var(--bg2)' },
  // type
  h2: { fontSize: 'clamp(28px,4.2vw,50px)', fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.15, marginBottom: 52, color: 'var(--t1)' },
}

const METRICS = [
  { label:'Revenue',     val:'$24,830', chg:'+18%', up:true  },
  { label:'Orders',      val:'312',     chg:'+22%', up:true  },
  { label:'Avg Order',   val:'$79.60',  chg:'+4%',  up:true  },
  { label:'Ad Spend',    val:'$1,240',  chg:'+5%',  up:false },
  { label:'ROAS',        val:'3.8×',    chg:'+12%', up:true  },
  { label:'Top Product', val:'Classic Tee', chg:'89 units', up:true },
]

const STEPS = [
  { n:'01', t:'Connect once',        b:'Link Shopify, Stripe, and Meta Ads in under 2 minutes. One-time setup.' },
  { n:'02', t:'We handle the rest',  b:'Every month we pull your data, crunch numbers, and build the report.' },
  { n:'03', t:'Report in your inbox',b:'On the 1st, your full performance report arrives. You do nothing.' },
]

const COMPARE = [
  { bad:'Log into Shopify, Stripe, Meta Ads separately every month',   good:'One email on the 1st. Everything in one place.' },
  { bad:'Copy-paste numbers into a spreadsheet for 2 hours',            good:'Zero manual work. Fully automated.' },
  { bad:'Send messy screenshots to your team or investors',             good:'Clean, professional PDF report every time.' },
]

const PLANS = [
  { name:'Solo',   price:'$29', period:'/mo', desc:'One store, everything automated.',      hi:false, feats:['1 Shopify store','Shopify + Stripe + Meta Ads','Monthly PDF report','Email delivery'] },
  { name:'Agency', price:'$59', period:'/mo', desc:'For agencies with multiple clients.',  hi:true,  feats:['Up to 5 stores','All integrations','White-label PDF reports','Priority support'] },
]

function EmailForm({ center = false, id }: { center?: boolean; id: string }) {
  const [email, setEmail] = useState('')
  const [st, setSt] = useState<'idle'|'loading'|'done'|'err'>('idle')

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (st === 'loading') return
    setSt('loading')
    try {
      const r = await fetch('/api/subscribe', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      setSt(r.ok ? 'done' : 'err')
    } catch { setSt('err') }
  }

  if (st === 'done') return (
    <div style={{ background:'var(--g2)', border:'1px solid var(--g3)', borderRadius:12, padding:'18px 24px', maxWidth:440, margin: center ? '0 auto' : undefined }}>
      <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:700, color:'var(--g)', marginBottom:4, fontSize:15 }}>✓ You're on the list.</div>
      <div style={{ fontSize:13, color:'var(--t3)', lineHeight:1.6 }}>First 50 signups get 2 months free. We'll be in touch soon.</div>
    </div>
  )

  return (
    <div style={{ maxWidth:440, margin: center ? '0 auto' : undefined }}>
      <form id={id} onSubmit={submit} style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
        <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@email.com" required
          style={{ flex:1, minWidth:180, background:'var(--bg3)', border:'1px solid var(--line2)', borderRadius:10, padding:'13px 18px', fontSize:14, color:'var(--t1)', outline:'none', fontFamily:"'Plus Jakarta Sans',sans-serif", transition:'border-color .15s, box-shadow .15s' }}
          onFocus={e=>{ e.target.style.borderColor='var(--p)'; e.target.style.boxShadow='0 0 0 3px rgba(139,124,248,.12)' }}
          onBlur={e=>{  e.target.style.borderColor='var(--line2)'; e.target.style.boxShadow='none' }}
        />
        <button type="submit" disabled={st==='loading'} style={{ background: st==='loading' ? 'var(--bg3)' : 'var(--p)', color: st==='loading' ? 'var(--t3)' : '#fff', border:'none', borderRadius:10, padding:'13px 22px', fontSize:14, fontWeight:600, fontFamily:"'Space Grotesk',sans-serif", cursor: st==='loading' ? 'not-allowed' : 'pointer', whiteSpace:'nowrap', boxShadow: st==='loading' ? 'none' : '0 2px 16px rgba(139,124,248,.3)', transition:'all .15s' }}>
          {st === 'loading' ? 'Joining...' : 'Get Early Access →'}
        </button>
      </form>
      {st === 'err' && <p style={{ fontSize:12, color:'var(--red)', marginTop:8 }}>Something went wrong. Please try again.</p>}
      <p style={{ fontSize:12, color:'var(--t3)', marginTop:10, lineHeight:1.5 }}>Free during beta · No credit card · No spam</p>
    </div>
  )
}

export default function Page() {
  return (
    <main style={{ background:'var(--bg)', minHeight:'100vh', position:'relative', zIndex:1 }}>

      {/* NAV */}
      <nav style={{ position:'sticky', top:0, zIndex:99, height:58, borderBottom:'1px solid var(--line)', background:'rgba(7,7,10,.88)', backdropFilter:'blur(18px)', WebkitBackdropFilter:'blur(18px)', display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 clamp(20px,5vw,64px)' }}>
        <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:700, fontSize:17, letterSpacing:'-0.5px' }}>
          store<span style={{ color:'var(--p)' }}>report</span>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:7, fontSize:12, color:'var(--g)' }}>
          <span style={{ width:7, height:7, borderRadius:'50%', background:'var(--g)', display:'block', flexShrink:0, animation:'livepulse 2s ease-in-out infinite' }} />
          Early access open
        </div>
      </nav>

      {/* HERO */}
      <section style={{ position:'relative', overflow:'hidden', padding:'clamp(80px,11vw,140px) clamp(20px,5vw,64px) clamp(64px,8vw,100px)' }}>
        {/* orbs */}
        <div style={{ position:'absolute', width:700, height:700, borderRadius:'50%', background:'radial-gradient(circle, rgba(139,124,248,.07) 0%, transparent 65%)', top:-200, right:-150, pointerEvents:'none' }} />
        <div style={{ position:'absolute', width:500, height:500, borderRadius:'50%', background:'radial-gradient(circle, rgba(45,212,160,.04) 0%, transparent 65%)', bottom:-100, left:-80, pointerEvents:'none' }} />

        <div style={{ maxWidth:760, position:'relative', zIndex:1 }}>
          {/* pill */}
          <div className="au" style={{ display:'inline-flex', alignItems:'center', gap:8, background:'var(--bg3)', border:'1px solid var(--line2)', borderRadius:100, padding:'5px 14px 5px 8px', fontSize:12, color:'var(--t2)', marginBottom:36 }}>
            <span style={{ background:'var(--pdim)', border:'1px solid var(--pborder)', color:'var(--p2)', borderRadius:100, padding:'2px 9px', fontSize:11, fontWeight:700, fontFamily:"'Space Grotesk',sans-serif", letterSpacing:'.5px' }}>NEW</span>
            Automated reports for Shopify store owners
          </div>

          {/* H1 — key fix: 64px max, line-height 1.18, no squishing */}
          <h1 className="au1" style={{ fontSize:'clamp(36px,5.2vw,64px)', fontFamily:"'Space Grotesk',sans-serif", fontWeight:700, lineHeight:1.18, letterSpacing:'-0.035em', marginBottom:24, color:'var(--t1)' }}>
            Your monthly store report —<br />
            <span className="grad">fully automatic.</span>
          </h1>

          <p className="au2" style={{ fontSize:'clamp(15px,1.7vw,18px)', color:'var(--t2)', maxWidth:500, lineHeight:1.75, marginBottom:36 }}>
            Connect Shopify, Stripe, and Meta Ads once. Every month, a clean performance report lands in your inbox. No spreadsheets. No copy-pasting. No effort.
          </p>

          <div className="au3"><EmailForm id="hero-form" /></div>

          <div className="au4" style={{ display:'flex', alignItems:'center', gap:8, marginTop:40, flexWrap:'wrap' }}>
            <span style={{ fontSize:12, color:'var(--t3)' }}>Connects with</span>
            {[['Shopify','#8aba3f'],['Stripe','#7c73e6'],['Meta Ads','#4f8ef7']].map(([n,c])=>(
              <span key={n} style={{ background:'var(--bg3)', border:'1px solid var(--line2)', borderRadius:6, padding:'4px 12px', fontSize:12, fontWeight:500, color:c, letterSpacing:'.2px' }}>{n}</span>
            ))}
          </div>
        </div>
      </section>

      {/* PREVIEW */}
      <div style={{ padding:'0 clamp(20px,5vw,64px) clamp(72px,9vw,110px)' }}>
        <div style={{ maxWidth:1040, margin:'0 auto', background:'var(--bg2)', border:'1px solid var(--line2)', borderRadius:20, overflow:'hidden', boxShadow:'0 32px 96px rgba(0,0,0,.5)' }}>
          {/* chrome bar */}
          <div style={{ background:'var(--bg3)', borderBottom:'1px solid var(--line)', padding:'12px 22px', display:'flex', alignItems:'center', gap:8 }}>
            {[0,1,2].map(i=><span key={i} style={{ width:10, height:10, borderRadius:'50%', background:'#2a2a38', display:'block' }}/>)}
            <span style={{ fontSize:12, color:'var(--t3)', marginLeft:8, flex:1 }}>Monthly Report — February 2026 · yourstore.myshopify.com</span>
            <span style={{ background:'var(--g2)', border:'1px solid var(--g3)', color:'var(--g)', fontSize:11, padding:'3px 11px', borderRadius:100, fontWeight:500, whiteSpace:'nowrap' }}>PDF Ready</span>
          </div>
          {/* metrics */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:1, background:'var(--line)' }}>
            {METRICS.map(m=>(
              <div key={m.label} style={{ background:'var(--bg2)', padding:'clamp(18px,3vw,30px)' }}>
                <div style={{ fontSize:10, textTransform:'uppercase', letterSpacing:'1.2px', color:'var(--t3)', marginBottom:12 }}>{m.label}</div>
                <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:700, fontSize:'clamp(20px,2.6vw,26px)', letterSpacing:'-0.03em', color:'var(--t1)', marginBottom:7 }}>{m.val}</div>
                <div style={{ fontSize:12, fontWeight:500, color: m.up ? 'var(--g)' : 'var(--red)' }}>{m.up?'↑':'↓'} {m.chg} vs last month</div>
              </div>
            ))}
          </div>
          <div style={{ borderTop:'1px solid var(--line)', padding:'13px 26px', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:8 }}>
            <span style={{ fontSize:12, color:'var(--t3)' }}>Auto-generated · Delivered March 1, 2026 at 8:00 AM</span>
            <span style={{ fontSize:11, color:'var(--p2)' }}>This is what your inbox looks like every month →</span>
          </div>
        </div>
      </div>

      {/* HOW IT WORKS */}
      <section style={S.sectionAlt}>
        <div style={S.wrap}>
          <p className="section-label">How it works</p>
          <h2 style={S.h2}>Set it up once.<br /><span className="grad">Then never again.</span></h2>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))', gap:16 }}>
            {STEPS.map(s=>(
              <div key={s.n} style={{ background:'var(--bg)', border:'1px solid var(--line2)', borderRadius:16, padding:'30px 26px', transition:'transform .2s, border-color .2s' }}
                onMouseEnter={e=>(e.currentTarget.style.transform='translateY(-3px)')}
                onMouseLeave={e=>(e.currentTarget.style.transform='none')}>
                <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:700, fontSize:13, color:'var(--p)', letterSpacing:1, marginBottom:18 }}>{s.n}</div>
                <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:700, fontSize:19, letterSpacing:'-0.02em', marginBottom:10, color:'var(--t1)', lineHeight:1.2 }}>{s.t}</div>
                <div style={{ fontSize:14, color:'var(--t2)', lineHeight:1.7 }}>{s.b}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BEFORE / AFTER */}
      <section style={S.section}>
        <div style={S.wrap}>
          <p className="section-label">The difference</p>
          <h2 style={S.h2}>Stop doing this<br /><span className="grad">every single month.</span></h2>
          <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
            {COMPARE.map((c,i)=>(
              <div key={i} style={{ display:'grid', gridTemplateColumns:'1fr 28px 1fr', gap:10, alignItems:'center' }}>
                <div style={{ background:'rgba(248,113,113,.04)', border:'1px solid rgba(248,113,113,.1)', borderRadius:12, padding:'14px 18px', fontSize:14, color:'var(--t3)', lineHeight:1.6 }}>
                  <span style={{ color:'var(--red)', marginRight:8 }}>✕</span>{c.bad}
                </div>
                <div style={{ color:'var(--line2)', textAlign:'center', fontSize:15 }}>→</div>
                <div style={{ background:'var(--pdim)', border:'1px solid var(--pborder)', borderRadius:12, padding:'14px 18px', fontSize:14, color:'var(--t1)', lineHeight:1.6 }}>
                  <span style={{ color:'var(--g)', marginRight:8 }}>✓</span>{c.good}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section style={S.sectionAlt}>
        <div style={S.wrap}>
          <p className="section-label">Pricing</p>
          <h2 style={S.h2}>Simple pricing.<br /><span className="grad">Cancel anytime.</span></h2>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', gap:16 }}>
            {PLANS.map(p=>(
              <div key={p.name} style={{ background: p.hi ? 'var(--pdim)' : 'var(--bg)', border:`1px solid ${p.hi?'var(--pborder)':'var(--line2)'}`, borderRadius:20, padding:'34px 30px', position:'relative', transition:'transform .2s' }}
                onMouseEnter={e=>(e.currentTarget.style.transform='translateY(-3px)')}
                onMouseLeave={e=>(e.currentTarget.style.transform='none')}>
                {p.hi && <div style={{ position:'absolute', top:-13, left:24, background:'linear-gradient(135deg,var(--p),var(--p2))', color:'#fff', fontSize:10, fontWeight:700, padding:'4px 12px', borderRadius:100, fontFamily:"'Space Grotesk',sans-serif", letterSpacing:1 }}>POPULAR</div>}
                <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:700, fontSize:17, marginBottom:6, color:'var(--t1)' }}>{p.name}</div>
                <div style={{ fontSize:13, color:'var(--t3)', marginBottom:26 }}>{p.desc}</div>
                <div style={{ display:'flex', alignItems:'baseline', gap:4, marginBottom:26 }}>
                  <span style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:700, fontSize:52, letterSpacing:'-0.04em', lineHeight:1, color: p.hi ? 'var(--p2)' : 'var(--t1)' }}>{p.price}</span>
                  <span style={{ fontSize:14, color:'var(--t3)' }}>{p.period}</span>
                </div>
                <div style={{ borderTop:'1px solid var(--line)', paddingTop:22 }}>
                  {p.feats.map(f=>(
                    <div key={f} style={{ display:'flex', alignItems:'center', gap:10, marginBottom:10, fontSize:14, color:'var(--t2)' }}>
                      <span style={{ color:'var(--g)', fontSize:13 }}>✓</span>{f}
                    </div>
                  ))}
                </div>
                <div style={{ fontSize:12, color:'var(--t3)', textAlign:'center', marginTop:18 }}>Free during beta</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{ borderTop:'1px solid var(--line)', padding:'clamp(80px,12vw,160px) clamp(20px,5vw,64px)', textAlign:'center', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 55% 55% at 50% 50%, rgba(139,124,248,.06) 0%, transparent 70%)', pointerEvents:'none' }} />
        <div style={{ maxWidth:540, margin:'0 auto', position:'relative', zIndex:1 }}>
          <h2 style={{ ...S.h2, marginBottom:20 }}>
            Your report is waiting.<br /><span className="grad">You just don't know it yet.</span>
          </h2>
          <p style={{ fontSize:16, color:'var(--t2)', marginBottom:36, lineHeight:1.7 }}>
            Join the waitlist. Free during beta.<br />First 50 signups get 2 months free at launch.
          </p>
          <EmailForm id="cta-form" center />
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop:'1px solid var(--line)', padding:'22px clamp(20px,5vw,64px)', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:10 }}>
        <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontWeight:700, fontSize:15, letterSpacing:'-0.5px' }}>
          store<span style={{ color:'var(--p)' }}>report</span>
        </div>
        <span style={{ fontSize:12, color:'var(--t3)' }}>© 2026 StoreReport · Built for Shopify store owners</span>
      </footer>

    </main>
  )
}
