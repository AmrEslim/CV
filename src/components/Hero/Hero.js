import React, { useEffect, useState } from 'react';
import { HashLink } from 'react-router-hash-link';
import { useTranslation } from '../../hooks/useTranslation';
import './Hero.css';

const Hero = () => {
  const { t } = useTranslation();
  const [text, setText] = useState('');
  const fullText = "std::unique_ptr<Engineer> dev = std::make_unique<Engineer>(\"Amr Eslim\");";

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      setText(fullText.slice(0, index));
      index++;
      if (index > fullText.length) clearInterval(timer);
    }, 50);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="hero" className="scene">
      <div className="content-container">
        <div className="hero-grid">
          <div className="hero-terminal">
            <div className="terminal-header">
              <span className="dot red"></span>
              <span className="dot yellow"></span>
              <span className="dot green"></span>
              <span className="terminal-title">user@amr-eslim:~</span>
            </div>
            <div className="terminal-body">
              <div className="code-line">
                <span className="prompt">$</span> 
                <span className="cmd">./init_system.sh --role=developer</span>
              </div>
              <div className="output">
                <p>Initializing core systems...</p>
                <p>Loading memory modules... [OK]</p>
                <p>Mounting file system... [OK]</p>
                <p className="highlight">Target: C++ / Embedded Systems / IoT</p>
              </div>
              
              <div className="code-line mt-4">
                <span className="prompt">$</span> 
                <span className="typing">{text}<span className="cursor">_</span></span>
              </div>

              <div className="hero-info-system">
                <div className="variable-block">
                  <span className="keyword">const</span> <span className="type">char*</span> <span className="var">location</span> = <span className="string">"{t('hero.info.location')}"</span>;
                </div>
                <div className="variable-block">
                  <span className="keyword">auto</span> <span className="var">specialization</span> = <span className="string">"{t('hero.info.specialization')}"</span>;
                  <span className="comment">// High performance critical systems</span>
                </div>
              </div>

              <div className="cta-group">
                 <HashLink smooth to="#projects" className="cta-button">
                    ::View_Projects()
                 </HashLink>
                 <HashLink smooth to="#contact" className="cta-button">
                    ::Connect()
                 </HashLink>
              </div>
            </div>
          </div>
          
          <div className="hero-visuals">
             {/* Abstract System Visualization */}
             <div className="hex-grid">
               <div className="hex-row">
                 <div className="hex">0x00</div>
                 <div className="hex">0xF4</div>
                 <div className="hex active">C++</div>
               </div>
               <div className="hex-row offset">
                 <div className="hex">0xA1</div>
                 <div className="hex active">IOT</div>
                 <div className="hex">0x33</div>
               </div>
               <div className="hex-row">
                 <div className="hex active">SYS</div>
                 <div className="hex">0x0F</div>
                 <div className="hex">0x88</div>
               </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;