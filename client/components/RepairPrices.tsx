import { useState, useEffect, useRef } from 'react';

interface RepairService {
  id: number;
  name: string;
  category: string;
  price: string;
  probability?: string;
}

interface RepairPricesProps {
  selectedProblem: number | null;
  onClose: () => void;
}

const repairServices: Record<number, RepairService[]> = {
  21: [ // Дверца не открывается
    { id: 11, name: "Установка та підключення пральної машини", category: "", price: "450 грн.", probability: "" },
    { id: 8, name: "Заміна електро-за��ка блокування люка (не відкриваються дверцята)", category: "", price: "від 250", probability: "" }
  ],
  22: [ // Не набирает воду
    { id: 5, name: "Заміна насоса (не зливає воду)", category: "", price: "від 350", probability: "" },
    { id: 6, name: "Заміна ТЕНа (не гріє воду)", category: "", price: "від 320", probability: "" },
    { id: 4, name: "Усунення засмичення (чистка всіх патрубків, шлангів)", category: "", price: "від 350", probability: "" }
  ],
  23: [ // Не отжимает
    { id: 4, name: "Усунення засмичення (чистка всіх патрубків, шлангів)", category: "", price: "від 350", probability: "" },
    { id: 9, name: "Заміна підшипників (гриміть під час віджиму)", category: "", price: "від 700", probability: "" },
    { id: 5, name: "Заміна насоса (не зливає воду)", category: "", price: "від 350", probability: "" }
  ],
  24: [ // Зависает на программе
    { id: 10, name: "Ремонт електронного модуля (плати управління)", category: "", price: "від 600", probability: "" },
    { id: 3, name: "Заміна / чистка фільтра", category: "", price: "від 280", probability: "" }
  ],
  25: [ // Вода не сливается
    { id: 4, name: "Усунення засмичення (чистка всіх патрубків, шлангів)", category: "", price: "від 350", probability: "" },
    { id: 5, name: "Заміна насоса (не зливає воду)", category: "", price: "від 350", probability: "" },
    { id: 7, name: "Заміна манжети люка (порвався ущільнювач)", category: "", price: "від 300", probability: "" }
  ],
  26: [ // Не крутит барабан
    { id: 7, name: "Заміна манжети люка (порвався ущільнювач)", category: "", price: "від 300", probability: "" },
    { id: 9, name: "Заміна підшипників (гриміть під час віджиму)", category: "", price: "від 700", probability: "" },
    { id: 10, name: "Ремонт електронного модуля (плати управління)", category: "", price: "від 600", probability: "" }
  ],
  27: [ // Не нагревает воду
    { id: 6, name: "Заміна ТЕНа (не гріє воду)", category: "", price: "від 320", probability: "" },
    { id: 10, name: "Ремонт електронного модуля (плати управління)", category: "", price: "від 600", probability: "" },
    { id: 3, name: "Заміна / чистка фільтра", category: "", price: "від 280", probability: "" }
  ],
  28: [ // Протекает
    { id: 7, name: "Заміна манжети люка (порвався ущільнювач)", category: "", price: "від 300", probability: "" },
    { id: 5, name: "Заміна насоса (не зливає воду)", category: "", price: "від 350", probability: "" },
    { id: 4, name: "Усунення засмичення (чистка всіх патрубків, шлангів)", category: "", price: "від 350", probability: "" }
  ],
  29: [ // Шумит при отжиме
    { id: 9, name: "Заміна підшипників (гриміть під час віджиму)", category: "", price: "від 700", probability: "" },
    { id: 8, name: "Заміна електро-замка блокування люка (не відкриваються дверцята)", category: "", price: "від 250", probability: "" },
    { id: 7, name: "Заміна манжети люка (порвався ущільнювач)", category: "", price: "від 300", probability: "" }
  ],
  30: [ // Не включается
    { id: 10, name: "Ремонт електронного модуля (плати управління)", category: "", price: "від 600", probability: "" },
    { id: 3, name: "Заміна / чистка фільтра", category: "", price: "від 280", probability: "" },
    { id: 6, name: "Заміна ТЕНа (не гріє воду)", category: "", price: "від 320", probability: "" }
  ]
};

export default function RepairPrices({ selectedProblem, onClose }: RepairPricesProps) {
  const [isVisible, setIsVisible] = useState(false);
  const frameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedProblem) {
      // Delay to allow for smoother animation
      setTimeout(() => {
        setIsVisible(true);
        // Scroll to frame after animation starts
        setTimeout(() => {
          frameRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }, 100);
      }, 50);
    } else {
      setIsVisible(false);
    }
  }, [selectedProblem]);

  if (!selectedProblem || !repairServices[selectedProblem]) {
    return null;
  }

  const services = repairServices[selectedProblem];
  const problemTitles: Record<number, string> = {
    21: "Дверца не открывается",
    22: "Не набирает воду", 
    23: "Не отжимает",
    24: "Зависает на программе",
    25: "Вода не сливается",
    26: "Не крутит барабан",
    27: "Не нагревает воду",
    28: "Протекает",
    29: "Шумит при отжиме",
    30: "Не включается"
  };

  return (
    <div
      ref={frameRef}
      className={`
        w-full max-w-4xl mx-auto transition-all duration-700 ease-out overflow-hidden
        ${isVisible ? 'max-h-96 opacity-100 transform translate-y-0' : 'max-h-0 opacity-0 transform -translate-y-4'}
      `}
    >
      <div className="bg-white border border-gray-300 rounded-sm shadow-sm">
        {/* Header */}
        <div className="bg-gray-50 border-b border-gray-300 px-4 py-3 flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900">
            Ціни на ремонт пральних машин: {problemTitles[selectedProblem]}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
          >
            ×
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-3 py-2 text-left text-sm font-medium text-gray-700 w-8">№</th>
                <th className="border border-gray-300 px-3 py-2 text-left text-sm font-medium text-gray-700">
                  Найменування робіт / Тип несправності
                </th>
                <th className="border border-gray-300 px-3 py-2 text-left text-sm font-medium text-gray-700 w-32">
                  Ціна грн.
                </th>
              </tr>
            </thead>
            <tbody>
              {services.map((service, index) => (
                <tr key={service.id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-3 py-2 text-sm text-gray-900 text-center">
                    {index + 1}
                  </td>
                  <td className="border border-gray-300 px-3 py-2 text-sm text-gray-900">
                    {service.name}
                    {service.probability && (
                      <span className="text-blue-600 ml-1">({service.probability})</span>
                    )}
                  </td>
                  <td className="border border-gray-300 px-3 py-2 text-sm text-gray-900 text-center">
                    {service.price}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer note */}
        <div className="bg-gray-50 border-t border-gray-300 px-4 py-2">
          <p className="text-xs text-gray-600">
            * Точную стоимость ремонта мастер сообщит после диагностики
          </p>
        </div>
      </div>
    </div>
  );
}
