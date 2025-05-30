import { useState } from "react";
import { FaAngleDown, FaTable, FaChartLine } from "react-icons/fa6";
import {
  CardMain,
  CardDetails,
  CardHeader,
  CardFooter,
  CardContent,
} from "../components/ui/Card";
import {
  Switcher,
  Selector,
  Button,
  ButtonIcon,
  ViewSelector,
} from "@components/ui";
import { FrecuencyTableStyled, SystemRecordsTable } from "@components/ui/Table";
import { Chart, ChartPalettes } from "@components/ui/Chart";

const chartData = {
  labels: ["Privado", "Publico", "Oficial", "Escolar"],
  datasets: [
    {
      label: "Ventas",
      data: [300, 205, 251, 252],
        backgroundColor: ChartPalettes[1].color1,
        borderColor: ChartPalettes[1].main,
        borderWidth: 2,
      fill: true,
      tension: 0.4,
      pointRadius: 4,
    },
  ],
};

const frecuencyData = [
  { var: "Servicio", cat: "Privado", total: 300 },
  { var: "Servicio", cat: "Publico", total: 205 },
  { var: "Servicio", cat: "Oficial", total: 251 },
  { var: "Servicio", cat: "Escolar", total: 252 },
  { var: "Servicio", cat: "Emergencia", total: 245 },
  { var: "Servicio", cat: "Turistico", total: 125 },

];

function Query() {
  const [option, setOption] = useState(null);
  const [type, setType] = useState("graph");
  const [menu, setMenu] = useState("general");
  const [showAside, setShowAside] = useState(true);

  return (
    <div className="flex flex-col md:flex-row w-full h-140 gap-3">
      <aside
        className={`flex flex-col relative ${
          showAside ? "w-full md:w-50" : "w-full md:w-8"
        }`}
      >
        <CardDetails className="flex flex-col w-full h-auto">
          {showAside && (
            <>
              <CardHeader className="relative text-sm mt-2">
                Categorias
              </CardHeader>
              <CardContent className="flex flex-col">
                <Selector
                  className="px-3 mb-2 h-full w-full"
                  options={[
                    { value: "a", label: "Inscripción" },
                    { value: "a1", label: "Servicio" },
                    { value: "a2", label: "Uso" },
                    { value: "a3", label: "Marca" },
                    { value: "a4", label: "Tipo Prop." },

                  ]}
                  value={option}
                  onChange={setOption}
                />
              </CardContent>
            </>
          )}
          <CardFooter className="border-none !pt-0">
            <ButtonIcon
              icon={
                <FaAngleDown
                  className={`transition-all duration-300 ${
                    showAside ? "rotate-180" : "rotate-0"
                  }`}
                />
              }
              className="w-full"
              onClick={() => setShowAside(!showAside)}
            />
          </CardFooter>
        </CardDetails>
      </aside>

      <CardMain className="w-full h-full mx-auto p-6 flex flex-col gap-6 rounded-xl shadow-xl border-gray-400 border-2 bg-white text-black">
        <ViewSelector
          current={menu}
          onChange={setMenu}
          options={[
            {
              label: "Información General",
              value: "general",
            },
            {
              label: "Tabulados",
              value: "tab",
            },
          ]}
        />
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] min-h-[220px] w-full min-w-0 gap-4">
          <section className="relative order-2 md:order-1 min-w-0">
            {menu === "tab" && (
              <SystemRecordsTable
                data={[
                  { variable: "inscripcion", period: "2024" }
                ]}
              />
            )}

            {menu === "general" && (
              <>
                <div
                  className={`block transition-all duration-300 ${
                    type == "table"
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 -translate-y-1 pointer-events-none min-w-0 h-0 overflow-hidden"
                  } w-full`}
                >
                  <FrecuencyTableStyled dataSource={frecuencyData} />
                </div>
                <div
                  className={`block transition-all duration-300 ${
                    type == "graph"
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 -translate-y-1 pointer-events-none h-0 overflow-hidden"
                  } w-full`}
                >
                  <Chart
                    className="w-full h-[220px] min-w-0"
                    type="bar"
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: { legend: { display: false } },
                    }}
                    data={chartData}
                    state="done"
                  />
                </div>
              </>
            )}
          </section>

          {menu === "general" && (
            <aside className="w-full md:w-20 max-w-xs min-w-0 flex flex-col order-1 md:order-2 mb-5 md:mb-0">
              <Switcher
                selected={type}
                onSelect={setType}
                options={[
                  {
                    label: <FaChartLine size="1.2rem" />,
                    value: "graph",
                  },
                  {
                    label: <FaTable size="1.2rem" />,
                    value: "table",
                  },
                ]}
              />
            </aside>
          )}
        </div>
      </CardMain>
    </div>
  );
}

export default Query;
