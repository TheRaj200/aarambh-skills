const Overview = () => {
    const stats = [
      {
        number: "17k",
        title: "Active Course"
      },
      {
        number: "11k",
        title: "Number Of Students"
      },
      {
        number: "10k",
        title: "Active Students"
      }
    ]
  
    return (
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-6">Overview</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl justify-center items-center flex flex-col p-6 shadow-lg hover:shadow-xl transition-shadow">
              <h3 className="text-4xl font-bold mb-2">{stat.number}</h3>
              <p className="text-gray-600">{stat.title}</p>
            </div>
          ))}
        </div>
      </div>
    )
  }
 export default Overview;