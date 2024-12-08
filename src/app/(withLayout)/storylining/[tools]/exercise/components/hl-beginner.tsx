export const HLBeginnerExercise = () => {
  return (
    <div>
      <p className="border p-2 text-sm rounded-md">
        Reading left to right, select which slide order results in the clearest
        narrative story
      </p>

      <div className="bg-white p-3 space-y-3 rounded-lg mt-3">
        {[1, 2, 3].map((item, index) => (
          <div
            key={item}
            className="border rounded-lg p-2 flex items-center gap-2 hover:cursor-pointer hover:border-gray-500"
          >
            <p className="font-semibold px-5">
              {String.fromCharCode(65 + index)}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 items-center gap-3">
              {[1, 2, 3, 4].map((it) => (
                <div className="bg-gray-100 p-4 rounded-md" key={it}>
                  <p>
                    Global smartphone sales have increased by nearly 40% over
                    the past 8 years
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
