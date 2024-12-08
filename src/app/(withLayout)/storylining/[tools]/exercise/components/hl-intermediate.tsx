export const HLIntermediateExercise = () => {
  return (
    <div>
      <p className="border p-2 text-sm rounded-md">
        Select the slide headline that least fits the storyline when read from
        left to right, considering context provided
      </p>
      <div className="bg-white p-3 rounded-lg mt-3">
        <div className="pb-3 space-y-2">
          <div className="bg-gray-200 p-2 uppercase font-semibold text-sm rounded-md flex items-center justify-between ">
            <p>Context</p>
          </div>
          <div className="border p-3 text-sm rounded-md">
            <ul className="list-disc px-6 space-y-2">
              <li>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Necessitatibus, illum.
              </li>
              <li>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Necessitatibus, illum.
              </li>
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 items-center gap-3 rounded-lg">
          {[1, 2, 3, 4].map((item, index) => (
            <div
              key={item}
              className="border rounded-lg p-2 items-center gap-2 hover:cursor-pointer hover:border-gray-500"
            >
              <div className="bg-gray-100 p-4 rounded-md">
                <p>
                  Global smartphone sales have increased by nearly 40% over the
                  past 8 years
                </p>
              </div>
              <p className="font-semibold py-1 text-center">
                {String.fromCharCode(65 + index)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
