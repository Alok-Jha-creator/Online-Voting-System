import React from 'react'

const teamMembers = [
  { name: 'दिनेश कुमार थपलिया', role: 'मुख्य निर्वाचन आयुक्त', since: '२०७९' },
  { name: 'राम प्रसाद भण्डारी', role: 'निर्वाचन आयुक्त', since: '२०७८' },
  { name: 'सुशील लुइटेल', role: 'निर्वाचन आयुक्त', since: '२०७८' },
]

const milestones = [
  { year: '२०१५', event: 'निर्वाचन आयोगको स्थापना' },
  { year: '२०४८', event: 'पहिलो बहुदलीय निर्वाचन सम्पन्न' },
  { year: '२०६४', event: 'संविधान सभा निर्वाचन' },
  { year: '२०७४', event: 'संघीय संसद तथा प्रदेश सभा निर्वाचन' },
  { year: '२०७९', event: 'संघीय र प्रदेश निर्वाचन - डिजिटल प्रणाली सहित' },
]

const services = [
  {
    icon: '🗳️',
    title: 'निर्वाचन सञ्चालन',
    desc: 'स्वतन्त्र, निष्पक्ष र पारदर्शी निर्वाचन सञ्चालन गर्नु आयोगको मूल दायित्व हो।'
  },
  {
    icon: '📋',
    title: 'मतदाता नामावली',
    desc: 'नागरिकहरूको मतदाता नामावलीमा दर्ता, अद्यावधिक र व्यवस्थापन गर्ने कार्य।'
  },
  {
    icon: '⚖️',
    title: 'दलबन्धन नियमन',
    desc: 'राजनीतिक दलहरूको दर्ता, नवीकरण र आचारसंहिता कार्यान्वयन।'
  },
  {
    icon: '📊',
    title: 'निर्वाचन अनुगमन',
    desc: 'निर्वाचन प्रक्रियाको अनुगमन, नतिजा प्रकाशन र विवाद समाधान।'
  },
]

const About = () => {
  return (
    <div style={{
      fontFamily: "'Noto Serif Devanagari', 'Tiro Devanagari Hindi', serif",
      background: '#f5f0e8',
      minHeight: '100vh',
      color: '#1a1a2e',
    }}>

      {/* Hero Section */}
      <div style={{
        background: 'linear-gradient(134deg, #0d3b6e 0%, #1a5276 50%, #0d3b6e 100%)',
        color: 'white',
        padding: '60px 40px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        borderBottom: '4px solid #c9a227',
      }}>
        {/* Decorative background pattern */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 30px, rgba(255,255,255,0.03) 30px, rgba(255,255,255,0.03) 60px)',
          pointerEvents: 'none'
        }} />

        {/* Emblem placeholder */}
        <div style={{
          width: 90, height: 90,
          background: 'radial-gradient(circle, #c9a227, #a07d1a)',
          borderRadius: '50%',
          margin: '0 auto 20px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 40,
          boxShadow: '0 4px 20px rgba(201,162,39,0.5)',
          border: '3px solid rgba(255,255,255,0.3)',
        }}>
          🏛️
        </div>

        <p style={{ fontSize: 13, letterSpacing: 4, color: '#c9a227', marginBottom: 8, textTransform: 'uppercase' }}>
          नेपाल सरकार
        </p>
        <h1 style={{
          fontSize: 'clamp(24px, 4vw, 40px)',
          fontWeight: 700,
          marginBottom: 10,
          textShadow: '0 2px 8px rgba(0,0,0,0.3)',
          letterSpacing: 1,
        }}>
          निर्वाचन आयोग
        </h1>
        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', letterSpacing: 2 }}>
          Election Commission of Nepal
        </p>
        <div style={{
          width: 60, height: 2,
          background: '#c9a227',
          margin: '20px auto 0',
          borderRadius: 2,
        }} />
      </div>

      <div style={{ maxWidth: 960, margin: '0 auto', padding: '40px 24px' }}>

        {/* About / Parichaya */}
        <section style={{ marginBottom: 56 }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24,
          }}>
            <div style={{ width: 5, height: 32, background: '#0d3b6e', borderRadius: 3 }} />
            <h2 style={{ fontSize: 24, fontWeight: 700, color: '#0d3b6e', margin: 0 }}>
              आयोगको परिचय
            </h2>
          </div>

          <div style={{
            background: 'white',
            borderRadius: 12,
            padding: '32px 36px',
            boxShadow: '0 2px 16px rgba(0,0,0,0.07)',
            borderLeft: '4px solid #c9a227',
            lineHeight: 2,
            fontSize: 16,
            color: '#2c3e50',
          }}>
            <p style={{ marginBottom: 16 }}>
              निर्वाचन आयोग नेपालको संविधानबमोजिम स्थापित एक स्वतन्त्र संवैधानिक निकाय हो।
              आयोगले नेपालमा हुने सबै प्रकारका निर्वाचनहरू — राष्ट्रपति, उपराष्ट्रपति, संघीय संसद,
              प्रदेश सभा र स्थानीय तह — को व्यवस्थापन, सञ्चालन र नियमन गर्दछ।
            </p>
            <p>
              आयोग स्वतन्त्र, निष्पक्ष, पारदर्शी र विश्वसनीय निर्वाचनको माध्यमबाट
              लोकतन्त्रको सुदृढीकरणमा प्रतिबद्ध छ। नागरिकहरूको मताधिकारको सुरक्षा
              र सम्मान गर्नु नै आयोगको सर्वोच्च प्राथमिकता हो।
            </p>
          </div>
        </section>

        {/* Mission & Vision */}
        <section style={{ marginBottom: 56 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
            <div style={{ width: 5, height: 32, background: '#0d3b6e', borderRadius: 3 }} />
            <h2 style={{ fontSize: 24, fontWeight: 700, color: '#0d3b6e', margin: 0 }}>
              लक्ष्य र उद्देश्य
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
            <div style={{
              background: '#0d3b6e',
              color: 'white',
              borderRadius: 12,
              padding: '28px 28px',
              boxShadow: '0 4px 20px rgba(13,59,110,0.25)',
            }}>
              <div style={{ fontSize: 28, marginBottom: 12 }}>🎯</div>
              <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12, color: '#c9a227' }}>
                हाम्रो लक्ष्य (Mission)
              </h3>
              <p style={{ lineHeight: 1.9, fontSize: 15, color: 'rgba(255,255,255,0.88)' }}>
                स्वतन्त्र, निष्पक्ष र पारदर्शी निर्वाचनको सञ्चालन गरी नेपालको
                लोकतान्त्रिक प्रणालीलाई सुदृढ बनाउनु।
              </p>
            </div>

            <div style={{
              background: 'white',
              borderRadius: 12,
              padding: '28px 28px',
              boxShadow: '0 2px 16px rgba(0,0,0,0.07)',
              border: '2px solid #e8dfc8',
            }}>
              <div style={{ fontSize: 28, marginBottom: 12 }}>🌟</div>
              <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12, color: '#0d3b6e' }}>
                हाम्रो दृष्टिकोण (Vision)
              </h3>
              <p style={{ lineHeight: 1.9, fontSize: 15, color: '#444' }}>
                एक विश्वसनीय, प्रविधिमैत्री र जनमुखी निर्वाचन आयोग — जहाँ
                हरेक नागरिकको मत सुरक्षित र सम्मानित छ।
              </p>
            </div>
          </div>
        </section>

        {/* Services */}
        <section style={{ marginBottom: 56 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
            <div style={{ width: 5, height: 32, background: '#0d3b6e', borderRadius: 3 }} />
            <h2 style={{ fontSize: 24, fontWeight: 700, color: '#0d3b6e', margin: 0 }}>
              आयोगका कार्यहरू
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
            {services.map((s, i) => (
              <div key={i} style={{
                background: 'white',
                borderRadius: 10,
                padding: '24px 20px',
                boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                borderTop: '3px solid #c9a227',
                transition: 'transform 0.2s',
              }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>{s.icon}</div>
                <h4 style={{ fontSize: 16, fontWeight: 700, color: '#0d3b6e', marginBottom: 8 }}>
                  {s.title}
                </h4>
                <p style={{ fontSize: 14, lineHeight: 1.8, color: '#555' }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Team */}
        <section style={{ marginBottom: 56 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
            <div style={{ width: 5, height: 32, background: '#0d3b6e', borderRadius: 3 }} />
            <h2 style={{ fontSize: 24, fontWeight: 700, color: '#0d3b6e', margin: 0 }}>
              पदाधिकारीहरू
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {teamMembers.map((m, i) => (
              <div key={i} style={{
                background: 'white',
                borderRadius: 10,
                padding: '20px 24px',
                display: 'flex',
                alignItems: 'center',
                gap: 20,
                boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                borderLeft: i === 0 ? '4px solid #c9a227' : '4px solid #bdc3c7',
              }}>
                <div style={{
                  width: 50, height: 50,
                  background: i === 0 ? '#0d3b6e' : '#ecf0f1',
                  borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 22,
                  flexShrink: 0,
                }}>
                  {i === 0 ? '👨‍⚖️' : '🧑‍💼'}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 17, color: '#1a1a2e' }}>{m.name}</div>
                  <div style={{ fontSize: 14, color: '#0d3b6e', marginTop: 2 }}>{m.role}</div>
                  <div style={{ fontSize: 12, color: '#888', marginTop: 2 }}>नियुक्त: {m.since}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Timeline */}
        <section style={{ marginBottom: 40 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
            <div style={{ width: 5, height: 32, background: '#0d3b6e', borderRadius: 3 }} />
            <h2 style={{ fontSize: 24, fontWeight: 700, color: '#0d3b6e', margin: 0 }}>
              ऐतिहासिक यात्रा
            </h2>
          </div>

          <div style={{
            background: 'white',
            borderRadius: 12,
            padding: '28px 32px',
            boxShadow: '0 2px 16px rgba(0,0,0,0.07)',
          }}>
            {milestones.map((m, i) => (
              <div key={i} style={{
                display: 'flex',
                gap: 20,
                marginBottom: i < milestones.length - 1 ? 24 : 0,
                position: 'relative',
              }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{
                    width: 40, height: 40,
                    background: '#0d3b6e',
                    borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#c9a227',
                    fontWeight: 700, fontSize: 11,
                    flexShrink: 0,
                  }}>
                    {m.year}
                  </div>
                  {i < milestones.length - 1 && (
                    <div style={{ width: 2, flex: 1, background: '#e0d5c0', marginTop: 4 }} />
                  )}
                </div>
                <div style={{ paddingTop: 8 }}>
                  <p style={{ fontSize: 15, color: '#2c3e50', lineHeight: 1.7, margin: 0 }}>{m.event}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section style={{
          background: '#0d3b6e',
          borderRadius: 12,
          padding: '28px 32px',
          color: 'white',
          textAlign: 'center',
        }}>
          <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16, color: '#c9a227' }}>
            सम्पर्क विवरण
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 24, fontSize: 14 }}>
            <div>📍 कान्तिपथ, काठमाडौं, नेपाल</div>
            <div>📞 ०१-४२३३२३४</div>
            <div>📧 info@election.gov.np</div>
            <div>🌐 www.election.gov.np</div>
          </div>
        </section>

      </div>
    </div>
  )
}

export default About