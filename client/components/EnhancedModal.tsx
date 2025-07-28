import { useState, useEffect, useRef } from 'react';
import { X, ChevronDown } from 'lucide-react';

interface ProblemData {
  title: string;
  description: string;
  color: string;
}

interface SpecificProblem {
  id: string;
  name: string;
  description: string;
  probability: number;
  cost: string;
  solution: string;
}

interface EnhancedModalProps {
  isOpen: boolean;
  onClose: () => void;
  problemData: ProblemData;
  problemId: number;
}

// Mock data for ages and brands
const ageOptions = [
  'Менее 1 года',
  '1-3 года', 
  '3-5 лет',
  '5-10 лет',
  'Более 10 лет'
];

const brandOptions = [
  'Samsung',
  'LG', 
  'Bosch',
  'Indesit',
  'Whirlpool',
  'Ariston',
  'Atlant',
  'Candy',
  'Другая марка'
];

// Mock specific problems data based on main problem type
const getSpecificProblems = (problemId: number, age: string, brand: string): SpecificProblem[] => {
  const problemSets: Record<number, SpecificProblem[]> = {
    1: [ // Door problems
      {
        id: 'door_1',
        name: 'Нет холодной воды',
        description: 'Проверить наличие холодной воды в системе водоснабжения',
        probability: 25,
        cost: 'от 1250грн',
        solution: '1. Проверьте подачу холодной воды в квартире\n2. Осмотрите входной кран\n3. Проверьте фильтр на входе\n4. Убедитесь что нет засора в шланге'
      },
      {
        id: 'door_2', 
        name: 'Неисправен датчик уровня воды',
        description: 'Замена датчика уровня воды',
        probability: 25,
        cost: 'от 1250грн',
        solution: '1. Д��агностика датчика прессостата\n2. Проверка трубки датчика\n3. Замена датчика при необходимости\n4. Калибровка системы'
      },
      {
        id: 'door_3',
        name: 'Неисправность системы залива воды', 
        description: 'Ремонт системы залива воды',
        probability: 25,
        cost: 'от 1250грн',
        solution: '1. Проверка электромагнитных клапанов\n2. Осмотр системы залива\n3. Очистка или замена клапанов\n4. Проверка электрических соединений'
      },
      {
        id: 'door_4',
        name: 'Засор в системе подачи воды',
        description: 'Чистка системы подачи воды', 
        probability: 25,
        cost: 'от 1250грн',
        solution: '1. Очистка фильтра входного шланга\n2. Промывка системы подачи\n3. Проверка на засоры\n4. Замена фильтров при необходимости'
      }
    ],
    2: [ // Water problems
      {
        id: 'water_1',
        name: 'Засорен сливной фильтр',
        description: 'Очистка сливного фильтра от загрязнений',
        probability: 30,
        cost: 'от 800грн',
        solution: '1. Откройте люк внизу машины\n2. Выкрутите фильтр против часовой стрелки\n3. Очистите от мусора и промойте\n4. Установите обратно и закрутите'
      },
      {
        id: 'water_2',
        name: 'Неисправен сливной насос',
        description: 'Замена сливного насоса',
        probability: 25,
        cost: 'от 1500грн', 
        solution: '1. Диагностика помпы слива\n2. Проверка крыльчатки насоса\n3. Замена насоса при поломке\n4. Тестирование работы системы слива'
      },
      {
        id: 'water_3',
        name: 'Засор сливного шланга',
        description: 'Прочистка сливного шланга',
        probability: 25,
        cost: 'от 900грн',
        solution: '1. Отсоедините сливной шланг\n2. Промойте под сильным напором\n3. Используйте трос ��ля прочистки\n4. Подсоедините обратно и проверьте'
      },
      {
        id: 'water_4',
        name: 'Проблема с датчиком воды',
        description: 'Замена датчика уровня воды',
        probability: 20,
        cost: 'от 1200грн',
        solution: '1. Проверка прессостата\n2. Осмотр соединительной трубки\n3. Замена датчика\n4. Настройка уровней воды'
      }
    ],
    3: [ // Spin problems
      {
        id: 'spin_1',
        name: 'Дисбаланс белья в барабане',
        description: 'Неравномерное распределение белья',
        probability: 35,
        cost: 'от 0грн',
        solution: '1. Остановите машину и откройте дверцу\n2. Перераспределите белье равномерно\n3. Не загружайте слишком много или мало\n4. Запустите отжим повторно'
      },
      {
        id: 'spin_2',
        name: 'Износ подшипников барабана',
        description: 'Замена подшипников и сальников',
        probability: 25,
        cost: 'от 2500грн',
        solution: '1. Демонтаж барабана\n2. Замена подшипников и сальников\n3. Смазка новых подшипников\n4. Сборка и тестирование'
      },
      {
        id: 'spin_3',
        name: 'Ослабление ремня привода',
        description: 'Регулировка или замена ремня',
        probability: 20,
        cost: 'от 800грн',
        solution: '1. Снятие задней панели\n2. Проверка натяжения ремня\n3. Регулировка или замена ремня\n4. Проверка работы двигателя'
      },
      {
        id: 'spin_4',
        name: 'Неисправность двигателя',
        description: 'Ремонт или замена двигателя',
        probability: 20,
        cost: 'от 3000грн',
        solution: '1. Диагностика двигателя\n2. Проверка обмоток и щеток\n3. Ремонт или замена двигателя\n4. Настройка и тестирование'
      }
    ],
    4: [ // Noise problems  
      {
        id: 'noise_1',
        name: 'Посторонние предметы в барабане',
        description: 'Удаление посторонних предметов',
        probability: 40,
        cost: 'от 500грн',
        solution: '1. Осмотрите барабан на предмет монет, пуговиц\n2. Проверьте карманы перед стиркой\n3. Удалите найденные предметы\n4. Проверьте отсутствие повреждений'
      },
      {
        id: 'noise_2',
        name: 'Износ амортизаторов',
        description: 'Замена амортизат��ров',
        probability: 25,
        cost: 'от 1800грн',
        solution: '1. Демонтаж старых амортизаторов\n2. Установка новых амортизаторов\n3. Проверка балансировки\n4. Тестирование на всех режимах'
      },
      {
        id: 'noise_3',
        name: 'Разбалансировка барабана',
        description: 'Балансировка барабана',
        probability: 20,
        cost: 'от 1500грн',
        solution: '1. Проверка креплений барабана\n2. Регулировка положения\n3. Добавление балансировочных грузов\n4. Финальное тестирование'
      },
      {
        id: 'noise_4',
        name: 'Износ подшипников',
        description: 'Замена подшипников',
        probability: 15,
        cost: 'от 2500грн',
        solution: '1. Полная разборка барабана\n2. Замена изношенных подшипников\n3. Установка новых сальников\n4. Сборка и настройка'
      }
    ],
    5: [ // Heating problems
      {
        id: 'heat_1',
        name: 'Неисправен ТЭН',
        description: 'Замена нагревательного элемента',
        probability: 45,
        cost: 'от 1800грн',
        solution: '1. Диагностика ТЭНа мультиметром\n2. Демонтаж старого ТЭНа\n3. Установка нового нагревателя\n4. Проверка герметичности и работы'
      },
      {
        id: 'heat_2',
        name: 'Накипь на ТЭНе',
        description: 'Очистка от накипи',
        probability: 30,
        cost: 'от 1200грн',
        solution: '1. Демонтаж ТЭНа\n2. Очистка от накипи специальными средствами\n3. Промывка системы\n4. Установка обратно'
      },
      {
        id: 'heat_3',
        name: 'Неисправен датчик температуры',
        description: 'Замена термодатчика',
        probability: 15,
        cost: 'от 900грн',
        solution: '1. Локализация тер��одатчика\n2. Проверка сопротивления\n3. Замена неисправного датчика\n4. Калибровка температурных режимов'
      },
      {
        id: 'heat_4',
        name: 'Проблема с управляющим модулем',
        description: 'Ремонт платы управления',
        probability: 10,
        cost: 'от 2200грн',
        solution: '1. Диагностика управляющего модуля\n2. Ремонт или замена платы\n3. Перепрошивка при необходимости\n4. Тестирование всех функций'
      }
    ],
    6: [ // Program problems
      {
        id: 'prog_1',
        name: 'Сбой программного обеспечения',
        description: 'Сброс настроек до заводских',
        probability: 35,
        cost: 'от 800г��н',
        solution: '1. Выполните сброс к заводским настройкам\n2. Отключите от сети на 15 минут\n3. Включите и запрограммируйте заново\n4. Проверьте работу всех программ'
      },
      {
        id: 'prog_2',
        name: 'Неисправность панели управления',
        description: 'Ремонт панели управления',
        probability: 25,
        cost: 'от 2000грн',
        solution: '1. Диагностика панели управления\n2. Замена неисправных кнопок или дисплея\n3. Проверка контактов\n4. Тестирование всех ��ункций'
      },
      {
        id: 'prog_3',
        name: 'Проблема с блокировкой дверцы',
        description: 'Ремонт замка дверцы',
        probability: 25,
        cost: 'от 1300грн',
        solution: '1. Проверка механизма блокировки\n2. Очистка контактов замка\n3. Замена УБЛ при необходимости\n4. Настройка корректной работы'
      },
      {
        id: 'prog_4',
        name: 'Н��исправность модуля управления',
        description: '��амена управляющего модуля',
        probability: 15,
        cost: 'от 3500грн',
        solution: '1. Полная диагностика модуля\n2. Замена управляющей платы\n3. Программирование нового модуля\n4. Комплексное тестирование'
      }
    ]
  };

  return problemSets[problemId] || [];
};

export default function EnhancedModal({ isOpen, onClose, problemData, problemId }: EnhancedModalProps) {
  const [selectedAge, setSelectedAge] = useState<string>('');
  const [selectedBrand, setSelectedBrand] = useState<string>('');
  const [expandedProblem, setExpandedProblem] = useState<string | null>(null);
  const [showAgeDropdown, setShowAgeDropdown] = useState(false);
  const [showBrandDropdown, setShowBrandDropdown] = useState(false);

  const ageDropdownRef = useRef<HTMLDivElement>(null);
  const brandDropdownRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const specificProblems = getSpecificProblems(problemId, selectedAge, selectedBrand);
  const showProblems = selectedAge && selectedBrand;

  // Handle click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ageDropdownRef.current && !ageDropdownRef.current.contains(event.target as Node)) {
        setShowAgeDropdown(false);
      }
      if (brandDropdownRef.current && !brandDropdownRef.current.contains(event.target as Node)) {
        setShowBrandDropdown(false);
      }
    };

    if (showAgeDropdown || showBrandDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showAgeDropdown, showBrandDropdown]);

  const handleAgeSelect = (age: string) => {
    setSelectedAge(age);
    setShowAgeDropdown(false);
    setExpandedProblem(null);
  };

  const handleBrandSelect = (brand: string) => {
    setSelectedBrand(brand);
    setShowBrandDropdown(false);
    setExpandedProblem(null);
  };

  const toggleProblemSolution = (problemId: string) => {
    setExpandedProblem(expandedProblem === problemId ? null : problemId);
  };

  const handleClose = () => {
    setSelectedAge('');
    setSelectedBrand('');
    setExpandedProblem(null);
    setShowAgeDropdown(false);
    setShowBrandDropdown(false);
    onClose();
  };

  const handleBack = () => {
    if (expandedProblem) {
      setExpandedProblem(null);
    } else if (showProblems) {
      setSelectedAge('');
      setSelectedBrand('');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 overflow-y-auto">
      <div className="min-h-screen flex items-center justify-center p-4">
        <div
          ref={modalRef}
          className="bg-[#FCFCF3] border border-[#DADADA] rounded-2xl shadow-[5px_5px_15px_rgba(0,0,0,0.09),-5px_-5px_15px_rgba(255,255,255,0.69)] w-full max-w-4xl my-8 relative"
        >
          
          {/* Header */}
          <div className="px-6 py-6 relative">
            <button
              onClick={handleClose}
              className="absolute right-4 top-4 text-[#606060] hover:text-[#333] transition-colors p-2"
              aria-label="Закрыть"
            >
              <X size={20} />
            </button>

            {(showProblems || expandedProblem) && (
              <button
                onClick={handleBack}
                className="absolute left-4 top-4 text-[#606060] hover:text-[#333] transition-colors p-2"
                aria-label="Назад"
              >
                ← Назад
              </button>
            )}

            <div className="flex flex-col items-center gap-4 px-4">
              <h2 className="text-[#ED9E65] text-center text-[22px] font-normal tracking-[-0.22px] font-noto-serif">
                {problemData.title}
              </h2>

              {/* Decorative Line */}
              <div className="w-full max-w-[725px] h-2 relative mt-[10px]">
                <svg
                  width="100%"
                  height="8"
                  viewBox="0 0 725 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full"
                >
                  <path
                    d="M0 4C0 6.20914 1.79086 8 4 8C6.20914 8 8 6.20914 8 4C8 1.79086 6.20914 0 4 0C1.79086 0 0 1.79086 0 4ZM717 4C717 6.20914 718.791 8 721 8C723.209 8 725 6.20914 725 4C725 1.79086 723.209 0 721 0C718.791 0 717 1.79086 717 4ZM4 4V4.75H7.51471V4V3.25H4V4ZM14.5441 4V4.75H21.5735V4V3.25H14.5441V4ZM28.6029 4V4.75H35.6324V4V3.25H28.6029V4ZM42.6618 4V4.75H49.6912V4V3.25H42.6618V4ZM56.7206 4V4.75H63.75V4V3.25H56.7206V4ZM70.7794 4V4.75H77.8088V4V3.25H70.7794V4ZM84.8382 4V4.75H91.8676V4V3.25H84.8382V4ZM98.8971 4V4.75H105.926V4V3.25H98.8971V4ZM112.956 4V4.75H119.985V4V3.25H112.956V4ZM127.015 4V4.75H134.044V4V3.25H127.015V4ZM141.074 4V4.75H148.103V4V3.25H141.074V4ZM155.132 4V4.75H162.162V4V3.25H155.132V4ZM169.191 4V4.75H176.221V4V3.25H169.191V4ZM183.25 4V4.75H190.279V4V3.25H183.25V4ZM197.309 4V4.75H204.338V4V3.25H197.309V4ZM211.368 4V4.75H218.397V4V3.25H211.368V4ZM225.427 4V4.75H232.456V4V3.25H225.427V4ZM239.485 4V4.75H246.515V4V3.25H239.485V4ZM253.544 4V4.75H260.574V4V3.25H253.544V4ZM267.603 4V4.75H274.632V4V3.25H267.603V4ZM281.662 4V4.75H288.691V4V3.25H281.662V4ZM295.721 4V4.75H302.75V4V3.25H295.721V4ZM309.78 4V4.75H316.809V4V3.25H309.78V4ZM323.838 4V4.75H330.868V4V3.25H323.838V4ZM337.897 4V4.75H344.927V4V3.25H337.897V4ZM351.956 4V4.75H358.985V4V3.25H351.956V4ZM366.015 4V4.75H373.044V4V3.25H366.015V4ZM380.074 4V4.75H387.103V4V3.25H380.074V4ZM394.133 4V4.75H401.162V4V3.25H394.133V4ZM408.191 4V4.75H415.221V4V3.25H408.191V4ZM422.25 4V4.75H429.28V4V3.25H422.25V4ZM436.309 4V4.75H443.339V4V3.25H436.309V4ZM450.368 4V4.75H457.397V4V3.25H450.368V4ZM464.427 4V4.75H471.456V4V3.25H464.427V4ZM478.486 4V4.75H485.515V4V3.25H478.486V4ZM492.544 4V4.75H499.574V4V3.25H492.544V4ZM506.603 4V4.75H513.633V4V3.25H506.603V4ZM520.662 4V4.75H527.692V4V3.25H520.662V4ZM534.721 4V4.75H541.75V4V3.25H534.721V4ZM548.78 4V4.75H555.809V4V3.25H548.78V4ZM562.839 4V4.75H569.868V4V3.25H562.839V4ZM576.897 4V4.75H583.927V4V3.25H576.897V4ZM590.956 4V4.75H597.986V4V3.25H590.956V4ZM605.015 4V4.75H612.045V4V3.25H605.015V4ZM619.074 4V4.75H626.103V4V3.25H619.074V4ZM633.133 4V4.75H640.162V4V3.25H633.133V4ZM647.192 4V4.75H654.221V4V3.25H647.192V4ZM661.25 4V4.75H668.28V4V3.25H661.25V4ZM675.309 4V4.75H682.339V4V3.25H675.309V4ZM689.368 4V4.75H696.398V4V3.25H689.368V4ZM703.427 4V4.75H710.456V4V3.25H703.427V4ZM717.486 4V4.75H721V4V3.25H717.486V4Z"
                    fill="url(#paint0_linear)"
                  />
                  <defs>
                    <linearGradient id="paint0_linear" x1="4" y1="4.5" x2="721" y2="4.5" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#606060"/>
                      <stop offset="1" stopColor="#ED9E65"/>
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="px-6 pb-6" style={{paddingTop: 'calc(0.5rem - 15px)'}}>
            {!showProblems && (
              <div className="space-y-2">
                <p className="text-[#434343] text-center text-[16px] tracking-[-0.16px] font-noto-serif">
                  Узнать вероятность конкретной неисправности и примерную стоимость ремонта
                </p>
                
                <div className="flex flex-wrap justify-center gap-8 md:gap-10 max-w-4xl mx-auto px-4 md:px-16">
                  {/* Age Selection */}
                  <div className="relative flex-1 min-w-[280px] max-w-[320px]" ref={ageDropdownRef}>
                    <button
                      onClick={() => {
                        setShowAgeDropdown(!showAgeDropdown);
                        setShowBrandDropdown(false);
                      }}
                      className="flex items-center justify-center w-full h-14 px-6 bg-[#ED9E65] border-[0.5px] border-[#DADADA] rounded-[5px] shadow-[3px_3px_6.1px_rgba(0,0,0,0.1)] hover:bg-[#D18A56] transition-colors"
                    >
                      <span className="text-white font-georgia text-[16px] font-normal tracking-[0.64px]">
                        {selectedAge || 'Выберите возраст'}
                      </span>
                      {!selectedAge && (
                        <ChevronDown
                          size={20}
                          className={`text-white ml-4 transition-transform ${showAgeDropdown ? 'rotate-180' : ''}`}
                        />
                      )}
                    </button>
                    
                    {showAgeDropdown && (
                      <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-[#DADADA] rounded-lg shadow-xl z-[1000] max-h-60 overflow-y-auto">
                        {ageOptions.map((age) => (
                          <button
                            key={age}
                            onClick={() => handleAgeSelect(age)}
                            className="w-full px-6 py-3 text-left text-[#353535] hover:bg-[#F5F5F5] transition-colors border-b border-[#EEEEEE] last:border-b-0 text-sm"
                          >
                            {age}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Brand Selection */}
                  <div className="relative flex-1 min-w-[280px] max-w-[320px]" ref={brandDropdownRef}>
                    <button
                      onClick={() => {
                        setShowBrandDropdown(!showBrandDropdown);
                        setShowAgeDropdown(false);
                      }}
                      className="flex items-center justify-center w-full h-14 px-6 bg-[#ED9E65] border-[0.5px] border-[#DADADA] rounded-[5px] shadow-[3px_3px_6.1px_rgba(0,0,0,0.1)] hover:bg-[#D18A56] transition-colors"
                    >
                      <span className="text-white font-georgia text-[16px] font-normal tracking-[0.64px]">
                        {selectedBrand || 'Выберите марку'}
                      </span>
                      {!selectedBrand && (
                        <ChevronDown
                          size={20}
                          className={`text-white ml-4 transition-transform ${showBrandDropdown ? 'rotate-180' : ''}`}
                        />
                      )}
                    </button>
                    
                    {showBrandDropdown && (
                      <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-[#DADADA] rounded-lg shadow-xl z-[1000] max-h-60 overflow-y-auto">
                        {brandOptions.map((brand) => (
                          <button
                            key={brand}
                            onClick={() => handleBrandSelect(brand)}
                            className="w-full px-6 py-3 text-left text-[#353535] hover:bg-[#F5F5F5] transition-colors border-b border-[#EEEEEE] last:border-b-0 text-sm"
                          >
                            {brand}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {showProblems && (
              <div className="space-y-4 animate-slide-in-from-bottom">
                <div className="text-center mb-6 p-4 bg-[#E8F4F8] rounded-lg">
                  <p className="text-[#434343] text-sm font-nunito">
                    Возраст: <span className="font-semibold text-[#2B5F75]">{selectedAge}</span> | 
                    Марка: <span className="font-semibold text-[#2B5F75]">{selectedBrand}</span>
                  </p>
                </div>
                
                <div className="space-y-3">
                  {specificProblems.map((problem) => (
                    <div key={problem.id} className="bg-[#F8F5ED] border border-[#898989] rounded-[15px] overflow-hidden shadow-[5px_5px_15.2px_rgba(0,0,0,0.09),-5px_-5px_15.2px_rgba(255,255,255,0.69)]">
                      {/* Problem Header */}
                      <button
                        onClick={() => toggleProblemSolution(problem.id)}
                        className="w-full h-[91px] px-[30px] pr-[28px] hover:bg-[#F0EBE3] transition-colors text-left"
                      >
                        <div className="flex items-center gap-[136px] h-full">
                          <div className="w-[281px] flex flex-col justify-center gap-[9px]">
                            <h3 className="text-[#ED9E65] font-georgia text-[16px] font-bold">
                              {problem.name}
                            </h3>
                            <p className="text-[rgba(45,45,45,0.79)] font-nunito text-[15px] font-normal tracking-[0.6px]">
                              {problem.description}
                            </p>
                          </div>
                          <div className="flex-1 text-center">
                            <div className="text-[#ED9E65] font-nunito text-[18px] font-bold">{problem.probability}%</div>
                          </div>
                          <div className="flex-1 text-center">
                            <div className="text-[#585858] font-nunito text-[18px] font-bold">{problem.cost}</div>
                          </div>
                          <div className="flex-shrink-0">
                            <ChevronDown
                              size={18}
                              className={`text-[#585858] transition-transform ${expandedProblem === problem.id ? 'rotate-180' : ''}`}
                            />
                          </div>
                        </div>
                      </button>
                      
                      {/* Expanded Solution */}
                      {expandedProblem === problem.id && (
                        <div className="border-t border-[#898989] bg-white bg-opacity-60 p-6 animate-slide-in-from-bottom">
                          <h4 className="text-lg font-bold mb-4 text-[#ED9E65] flex items-center gap-2">
                            🔧 Пошаговое решение:
                          </h4>
                          <pre className="text-sm leading-relaxed whitespace-pre-wrap text-[#333] font-nunito">
                            {problem.solution}
                          </pre>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
