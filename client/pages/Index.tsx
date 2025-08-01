import SimpleRive from '../components/SimpleRive';
import FAQSection from '../components/FAQSection';

export default function Index() {
  return (
    <div className="min-h-screen bg-white">
      {/* CSS WASHING MACHINE */}
      <div id="washer">
        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          style={{ display: 'none' }}
        >
          <symbol id="wave">
            <path d="M420,20c21.5-0.4,38.8-2.5,51.1-4.5c13.4-2.2,26.5-5.2,27.3-5.4C514,6.5,518,4.7,528.5,2.7c7.1-1.3,17.9-2.8,31.5-2.7c0,0,0,0,0,0v20H420z"></path>
            <path d="M420,20c-21.5-0.4-38.8-2.5-51.1-4.5c-13.4-2.2-26.5-5.2-27.3-5.4C326,6.5,322,4.7,311.5,2.7C304.3,1.4,293.6-0.1,280,0c0,0,0,0,0,0v20H420z"></path>
            <path d="M140,20c21.5-0.4,38.8-2.5,51.1-4.5c13.4-2.2,26.5-5.2,27.3-5.4C234,6.5,238,4.7,248.5,2.7c7.1-1.3,17.9-2.8,31.5-2.7c0,0,0,0,0,0v20H140z"></path>
            <path d="M140,20c-21.5-0.4-38.8-2.5-51.1-4.5c-13.4-2.2-26.5-5.2-27.3-5.4C46,6.5,42,4.7,31.5,2.7C24.3,1.4,13.6-0.1,0,0c0,0,0,0,0,0l0,20H140z"></path>
          </symbol>
        </svg>

        <div id="door">
          <div className="handle"></div>
          <div id="inner-door">
            <div id="page" className="page">
              <div id="water" className="water">
                <svg viewBox="0 0 560 20" className="water-wave water-wave-back">
                  <use xlinkHref="#wave"></use>
                </svg>
                <svg viewBox="0 0 560 20" className="water-wave water-wave-front">
                  <use xlinkHref="#wave"></use>
                </svg>

                <div className="water-inner">
                  <div className="bubble bubble1"></div>
                  <div className="bubble bubble2"></div>
                  <div className="bubble bubble3"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="clock"></div>
      </div>

      {/* RIVE COMPONENT */}
      <div className="flex justify-center">
        <SimpleRive />
      </div>

      {/* FAQ SECTION */}
      <FAQSection />
    </div>
  );
}
