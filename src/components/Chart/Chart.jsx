import React from 'react';
import { useTranslation } from 'react-i18next';
import { selectCurrentUser } from '../../redux/user/user.selector';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { groupDefaultColors } from '../../constants';
import QuizContext from '../../contexts/QuizContext';
import centerWheelGray from '../../assets/centerWheel-gray.png';
import centerWheelGold from '../../assets/centerWheel-gold.png';
import centerWheel1To80 from '../../assets/centerWheel1To80.png';
import centerWheel81To120 from '../../assets/centerWheel81To120.png';
import Asset9 from '../../assets/Asset9.png';
import Asset8 from '../../assets/Asset8.png';
import Asset7 from '../../assets/Asset7.png';
import Asset6 from '../../assets/Asset6.png';
import Asset5 from '../../assets/Asset5.png';
import Asset4 from '../../assets/Asset4.png';
import Asset3 from '../../assets/Asset3.png';
import Asset2 from '../../assets/Asset2.png';
import Asset1 from '../../assets/Asset1.png';
import EnglishExternalCircle from '../../assets/testENGLISH.png';
import './Chart.scss';

const Chart = () => {
  const { t } = useTranslation();
  const { quizState, totalScore, colors } = React.useContext(QuizContext);
  const [renderedBarsArray, setRenderedBarsArray] = React.useState([]);
  const [itemsRendered, setItemsRendered] = React.useState(0);
  const barHeight = 200;
  const data = quizState.finalData || [];

  React.useEffect(() => {
    const timer =
      itemsRendered < data.length && setTimeout(updateRenderedThings, 100);
    return () => clearInterval(timer);
  }, [data, itemsRendered]);

  const updateRenderedThings = () => {
    setRenderedBarsArray(renderedBarsArray.concat(data[itemsRendered]));
    setItemsRendered(itemsRendered + 1);
  };

  let max = 0;
  for (let i = data.length; i--; ) {
    for (let j = data[i].length; j--; ) {
      if (data[i][j] > max) {
        max = data[i][j];
      }
    }
  }

  const renderLabel = () => {
    return (
      <>
        <div className='harmonie2'>
          <div
            style={{
              color: '#32774b',
              fontFamily: 'Playfair Display SC',
              letterSpacing: '0.5mm',
              transform: 'rotate(90deg)'
            }}
          >
            {t('Category2')}
          </div>
        </div>
        <div className='plentitude2'>
          <div
            style={{
              marginTop: '20px',
              color: '#006c8b',
              fontFamily: 'Playfair Display SC',
              letterSpacing: '0.5mm'
            }}
          >
            {t('Category1')}
          </div>
        </div>
        <div className='vitalite2'>
          <div
            style={{
              color: '#c45621',
              fontFamily: 'Playfair Display SC',
              letterSpacing: '0.5mm'
            }}
          >
            {t('Category3')}
          </div>
        </div>
        <div className='prosperite2'>
          <div
            style={{
              color: '#8c191c',
              fontFamily: 'Playfair Display SC',
              letterSpacing: '0.5mm',
              transform: 'rotate(270deg)'
            }}
          >
            {t('Category4')}
          </div>
        </div>
        <div className='goldenCircle11'>
          <img
            src={EnglishExternalCircle}
            width='640'
            alt='Asset1'
            className='circle10'
          />
        </div>
      </>
    );
  };

  const renderInnerCircle = () => {
    switch (true) {
      case totalScore === 0:
        return (
          <div className='goldenCircle'>
            <img
              src={centerWheelGold}
              width='100'
              alt='centerWheelGold'
              className='circleround'
            />
          </div>
        );
      case totalScore > 0 && totalScore <= 80:
        return (
          <div className='goldenCircle'>
            <img
              src={centerWheel1To80}
              width='100'
              alt='centerWheelGold'
              className='circleround'
            />
          </div>
        );
      case totalScore >= 81 && totalScore <= 120:
        return (
          <div className='goldenCircle'>
            <img
              src={centerWheel81To120}
              width='100'
              alt='centerWheelGold'
              className='circleround'
            />
          </div>
        );
      case totalScore > 121:
        return (
          <div className='goldenCircle'>
            <img
              src={centerWheelGray}
              width='109'
              alt='centerWheelGray'
              className='circlecenter'
            />
          </div>
        );
      default:
        return (
          <div className='goldenCircle'>
            <img
              src={centerWheelGray}
              width='109'
              alt='centerWheelGray'
              className='circlecenter'
            />
          </div>
        );
    }
  };

  const renderGoldenRings = () => {
    const minNumber = Math.min.apply(null, data);
    switch (minNumber) {
      case 9:
        return (
          <div>
            {renderLabel()}
            {renderInnerCircle()}
            <div className='middleCircle'>
              <img src={Asset9} width='150' alt='Asset9' className='circle9' />
            </div>
            <div className='middleCircle'>
              <img src={Asset8} width='190' alt='Asset8' className='circle8' />
            </div>
            <div className='middleCircle'>
              <img src={Asset7} width='230' alt='Asset7' className='circle7' />
            </div>
            <div className='middleCircle'>
              <img src={Asset6} width='270' alt='Asset6' className='circle6' />
            </div>
            <div className='middleCircle'>
              <img src={Asset5} width='305' alt='Asset5' className='circle5' />
            </div>
            <div className='middleCircle'>
              <img src={Asset4} width='345' alt='Asset4' className='circle4' />
            </div>
            <div className='middleCircle'>
              <img src={Asset3} width='390' alt='Asset3' className='circle3' />
            </div>
            <div className='middleCircle'>
              <img src={Asset2} width='425' alt='Asset2' className='circle2' />
            </div>
            <div className='middleCircle'>
              <img src={Asset1} width='465' alt='Asset1' className='circle1' />
            </div>
          </div>
        );
      case 8:
        return (
          <div>
            {renderLabel()}
            {renderInnerCircle()}
            <div className='middleCircle'>
              <img src={Asset9} width='150' alt='Asset9' className='circle9' />
            </div>
            <div className='middleCircle'>
              <img src={Asset8} width='190' alt='Asset8' className='circle8' />
            </div>
            <div className='middleCircle'>
              <img src={Asset7} width='230' alt='Asset7' className='circle7' />
            </div>
            <div className='middleCircle'>
              <img src={Asset6} width='270' alt='Asset6' className='circle6' />
            </div>
            <div className='middleCircle'>
              <img src={Asset5} width='305' alt='Asset5' className='circle5' />
            </div>
            <div className='middleCircle'>
              <img src={Asset4} width='345' alt='Asset4' className='circle4' />
            </div>
            <div className='middleCircle'>
              <img src={Asset3} width='390' alt='Asset3' className='circle3' />
            </div>
            <div className='middleCircle'>
              <img src={Asset2} width='425' alt='Asset2' className='circle2' />
            </div>
          </div>
        );
      case 7:
        return (
          <div>
            {renderLabel()}
            {renderInnerCircle()}
            <div className='middleCircle'>
              <img src={Asset9} width='150' alt='Asset9' className='circle9' />
            </div>
            <div className='middleCircle'>
              <img src={Asset8} width='190' alt='Asset8' className='circle8' />
            </div>
            <div className='middleCircle'>
              <img src={Asset7} width='230' alt='Asset7' className='circle7' />
            </div>
            <div className='middleCircle'>
              <img src={Asset6} width='270' alt='Asset6' className='circle6' />
            </div>
            <div className='middleCircle'>
              <img src={Asset5} width='305' alt='Asset5' className='circle5' />
            </div>
            <div className='middleCircle'>
              <img src={Asset4} width='345' alt='Asset4' className='circle4' />
            </div>
            <div className='middleCircle'>
              <img src={Asset3} width='390' alt='Asset3' className='circle3' />
            </div>
          </div>
        );
      case 6:
        return (
          <div>
            {renderLabel()}
            {renderInnerCircle()}
            <div className='middleCircle'>
              <img src={Asset9} width='150' alt='Asset9' className='circle9' />
            </div>
            <div className='middleCircle'>
              <img src={Asset8} width='190' alt='Asset8' className='circle8' />
            </div>
            <div className='middleCircle'>
              <img src={Asset7} width='230' alt='Asset7' className='circle7' />
            </div>
            <div className='middleCircle'>
              <img src={Asset6} width='270' alt='Asset6' className='circle6' />
            </div>
            <div className='middleCircle'>
              <img src={Asset5} width='305' alt='Asset5' className='circle5' />
            </div>
            <div className='middleCircle'>
              <img src={Asset4} width='345' alt='Asset4' className='circle4' />
            </div>
          </div>
        );
      case 5:
        return (
          <div>
            {renderLabel()}
            {renderInnerCircle()}
            <div className='middleCircle'>
              <img src={Asset9} width='150' alt='Asset9' className='circle9' />
            </div>
            <div className='middleCircle'>
              <img src={Asset8} width='190' alt='Asset8' className='circle8' />
            </div>
            <div className='middleCircle'>
              <img src={Asset7} width='230' alt='Asset7' className='circle7' />
            </div>
            <div className='middleCircle'>
              <img src={Asset6} width='270' alt='Asset6' className='circle6' />
            </div>
            <div className='middleCircle'>
              <img src={Asset5} width='305' alt='Asset5' className='circle5' />
            </div>
          </div>
        );
      case 4:
        return (
          <div>
            {renderLabel()}
            {renderInnerCircle()}
            <div className='middleCircle'>
              <img src={Asset9} width='150' alt='Asset9' className='circle9' />
            </div>
            <div className='middleCircle'>
              <img src={Asset8} width='190' alt='Asset8' className='circle8' />
            </div>
            <div className='middleCircle'>
              <img src={Asset7} width='230' alt='Asset7' className='circle7' />
            </div>
            <div className='middleCircle'>
              <img src={Asset6} width='270' alt='Asset6' className='circle6' />
            </div>
          </div>
        );
      case 3:
        return (
          <div>
            {renderLabel()}
            {renderInnerCircle()}
            <div className='middleCircle'>
              <img src={Asset9} width='150' alt='Asset9' className='circle9' />
            </div>
            <div className='middleCircle'>
              <img src={Asset8} width='190' alt='Asset8' className='circle8' />
            </div>
            <div className='middleCircle'>
              <img src={Asset7} width='230' alt='Asset7' className='circle7' />
            </div>
          </div>
        );
      case 2:
        return (
          <div>
            {renderLabel()}
            {renderInnerCircle()}
            <div className='middleCircle'>
              <img src={Asset9} width='150' alt='Asset9' className='circle9' />
            </div>
            <div className='middleCircle'>
              <img src={Asset8} width='190' alt='Asset8' className='circle8' />
            </div>
          </div>
        );
      case 1:
        return (
          <div>
            {renderLabel()}
            {renderInnerCircle()}
            <div className='middleCircle'>
              <img src={Asset9} width='150' alt='Asset9' className='circle9' />
            </div>
          </div>
        );
      case 0:
        return (
          <div>
            {renderLabel()}
            {renderInnerCircle()}
          </div>
        );

      default:
        return (
          <div>
            {renderLabel()}
            {renderInnerCircle()}
            <div className='middleCircle'>
              <img src={Asset9} width='150' alt='Asset9' className='circle9' />
            </div>
            <div className='middleCircle'>
              <img src={Asset8} width='190' alt='Asset8' className='circle8' />
            </div>
            <div className='middleCircle'>
              <img src={Asset7} width='230' alt='Asset7' className='circle7' />
            </div>
            <div className='middleCircle'>
              <img src={Asset6} width='270' alt='Asset6' className='circle6' />
            </div>
            <div className='middleCircle'>
              <img src={Asset5} width='305' alt='Asset5' className='circle5' />
            </div>
            <div className='middleCircle'>
              <img src={Asset4} width='345' alt='Asset4' className='circle4' />
            </div>
            <div className='middleCircle'>
              <img src={Asset3} width='390' alt='Asset3' className='circle3' />
            </div>
            <div className='middleCircle'>
              <img src={Asset2} width='425' alt='Asset2' className='circle2' />
            </div>
            <div className='middleCircle'>
              <img src={Asset1} width='465' alt='Asset1' className='circle1' />
            </div>
          </div>
        );
    }
  };

  return (
    <>
      <div className='Charts' id='Charts'>
        {renderedBarsArray.map((serie, serieIndex) => {
          const color = groupDefaultColors[serieIndex];
          let style;
          let size = serie;

          style = {
            background: colors[serieIndex],
            zIndex: serie
          };

          style['height'] = size * 10 + '%';
          style['width'] = 10;

          return (
            <div
              className={'Charts--serie'}
              key={serieIndex}
              style={{ height: barHeight ? barHeight : 'auto' }}
            >
              <div className={'Charts--item'} style={style} key={serieIndex}>
                <b
                  style={{
                    color: color,
                    fontSize: '15px',
                    padding: '2%',
                    fontFamily: 'sans-serif'
                  }}
                >
                  {Math.abs(10 - serie)}
                </b>
              </div>
            </div>
          );
        })}
        {renderGoldenRings()}
      </div>
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

export default connect(mapStateToProps)(Chart);
