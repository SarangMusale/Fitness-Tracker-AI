import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  BarChart,
  Bar
} from "recharts";

function Analytics() {

  const data = [
    {
      day: "Mon",
      calories: 400,
      duration: 45,
    },
    {
      day: "Tue",
      calories: 650,
      duration: 70,
    },
    {
      day: "Wed",
      calories: 500,
      duration: 50,
    },
    {
      day: "Thu",
      calories: 700,
      duration: 80,
    },
    {
      day: "Fri",
      calories: 550,
      duration: 60,
    },
    {
      day: "Sat",
      calories: 850,
      duration: 95,
    },
    {
      day: "Sun",
      calories: 300,
      duration: 30,
    },
  ];

  return (
    <div className="p-4 md:p-6">

      <h1 className="text-3xl md:text-4xl font-bold mb-8">
        Analytics Dashboard
      </h1>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

        {/* Calories Chart */}
        <div className="bg-slate-800 p-6 rounded-2xl">

          <h2 className="text-2xl font-bold mb-6">
            Calories Burned
          </h2>

          <div className="h-80">

            <ResponsiveContainer width="100%" height="100%">

              <LineChart data={data}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="day" />

                <YAxis />

                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="calories"
                  stroke="#06b6d4"
                  strokeWidth={3}
                />

              </LineChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* Duration Chart */}
        <div className="bg-slate-800 p-6 rounded-2xl">

          <h2 className="text-2xl font-bold mb-6">
            Workout Duration
          </h2>

          <div className="h-80">

            <ResponsiveContainer width="100%" height="100%">

              <BarChart data={data}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="day" />

                <YAxis />

                <Tooltip />

                <Bar
                  dataKey="duration"
                  fill="#22c55e"
                  radius={[8, 8, 0, 0]}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Analytics;
