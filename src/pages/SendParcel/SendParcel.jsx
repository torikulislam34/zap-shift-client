import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { useLoaderData } from "react-router";


const SendParcel = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({
    defaultValues: {
      senderName: " "
    }
  });

  const serviceCenters = useLoaderData();
    /* ================= Derived Data ================= */
  const regions = [...new Set(serviceCenters.map(item => item.region))];
  // Get District by region
  const getDistrictByRegion = (region) => serviceCenters.filter((w) => w.region === region).map((w) => w.district);

  /* ================= Watches ================= */
  const parcelType = watch("type");
  const senderRegion = watch("senderRegion");
  const receiverRegion = watch("receiverRegion");

  /* ================= Custom Toast ================= */
  const showConfirmToast = (data) => {
    toast.custom(
      (t) => (
        <div
          className={`card w-96 bg-base-100 border border-gray-300 shadow-xl
          transition-all ${t.visible ? "scale-100" : "scale-95 opacity-0"}`}
        >
          <div className="card-body space-y-3">
            <h3 className="text-lg font-semibold text-center">
              Confirm Parcel
            </h3>

            <p className="text-sm text-gray-500 text-center">
              Please confirm before submitting your parcel.
            </p>

            <div className="divider my-1"></div>

            {/* Placeholder cost */}
            <p className="text-center text-xl font-bold text-primary">
              Estimated Cost: ৳250
            </p>

            <div className="flex gap-3 mt-4">
              <button
                className="btn btn-outline btn-sm flex-1"
                onClick={() => toast.dismiss(t.id)}
              >
                Cancel
              </button>

              <button
                className="btn btn-primary btn-sm flex-1 text-white"
                onClick={() => {
                  console.log("Confirmed Parcel:", {
                    ...data,
                    creation_date: new Date().toISOString(),
                  });

                  toast.dismiss(t.id);
                  toast.success("Parcel confirmed & saved!");
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      ),
      {
        duration: Infinity,
        position: "top-center",
      }
    );
  };

  const onSubmit = (data) => {
    showConfirmToast(data);
  };

  // const sersviceCenters = useLoaderData();
  //   console.log(sersviceCenters)

  return (
    <div className="max-w-5xl mx-auto p-6 bg-base-100">
       <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "transparent",
            boxShadow: "none",
          },
        }}
      />
      {/* ================= Heading ================= */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold">Send a Parcel</h1>
        <p className="text-primary">
          Provide pickup & delivery information to send your parcel
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

        {/* ================= Parcel Info ================= */}
        <div className="card border border-gray-600 shadow p-8 bg-base-100">
          <h2 className="text-xl font-semibold mb-4">Parcel Info</h2>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Parcel Type (Radio) */}
            <div className="form-control">
              <label className="label font-medium">Parcel Type</label>
              <div className="flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    value="document"
                    className="radio radio-primary"
                    {...register("type", { required: true })}
                  />
                  <span>Document</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    value="non-document"
                    className="radio radio-primary"
                    {...register("type", { required: true })}
                  />
                  <span>Non-Document</span>
                </label>
              </div>
              {errors.type && (
                <span className="text-error text-sm mt-1">
                  Parcel type is required
                </span>
              )}
            </div>

            {/* Title */}
            <div className="form-control">
              <label className="label">Parcel Name</label>
              <input
                placeholder="describe your parcel"
                type="text"
                className="input input-bordered"
                {...register("title", { required: true })}
              />
              {errors.title && (
                <span className="text-error text-sm">Required</span>
              )}
            </div>

            {/* Weight */}
            {parcelType === "non-document" && (
              <div className="form-control">
                <label className="label">Weight (kg)</label>
                <input
                  type="number"
                  step="0.1"
                  className="input input-bordered"
                  {...register("weight")}
                />
              </div>
            )}
          </div>
        </div>

        {/* ================= Sender & Receiver ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* ================= Sender ================= */}
          <div className="card border border-gray-600 shadow p-8 bg-base-100">
            <h2 className="text-xl font-semibold mb-4">Sender Info</h2>

            <div className="grid md:grid-cols-2 gap-4">
              <input
                className="input input-bordered"
                placeholder="Sender Name"
                {...register("senderName", { required: true })}
              />

              <input
                className="input input-bordered"
                placeholder="Contact Number"
                {...register("senderContact", { required: true })}
              />

              {/* Region */}
              <select
                className="select select-bordered"
                {...register("senderRegion", { required: true })}
              >
                <option value="">Select Region</option>
                {regions.map(region => (
                  <option key={region} value={region}>
                    {region}
                  </option>
                ))}
              </select>

              {/* Service Center */}
              <select
                className="select select-bordered"
                {...register("senderCenter", { required: true })}
                disabled={!senderRegion}
              >
                <option value="">Select Service Center</option>
                {serviceCenters
                  .filter(item => item.region === senderRegion)
                  .map(item => (
                    <option key={item.id} value={item.district}>
                      {item.district}
                    </option>
                  ))}
              </select>

              <textarea
                className="textarea textarea-bordered"
                placeholder="Pickup Address"
                {...register("senderAddress", { required: true })}
              />

              <textarea
                className="textarea textarea-bordered"
                placeholder="Pickup Instruction"
                {...register("pickupInstruction", { required: true })}
              />
            </div>
          </div>

          {/* ================= Receiver ================= */}
          <div className="card border border-gray-600 shadow p-8 bg-base-100">
            <h2 className="text-xl font-semibold mb-4">Receiver Info</h2>

            <div className="grid md:grid-cols-2 gap-4">
              <input
                className="input input-bordered"
                placeholder="Receiver Name"
                {...register("receiverName", { required: true })}
              />

              <input
                className="input input-bordered"
                placeholder="Contact Number"
                {...register("receiverContact", { required: true })}
              />

              {/* Region */}
              <select
                className="select select-bordered"
                {...register("receiverRegion", { required: true })}
              >
                <option value="">Select Region</option>
                {regions.map(region => (
                  <option key={region} value={region}>
                    {region}
                  </option>
                ))}
              </select>

              {/* Service Center */}
              <select
                className="select select-bordered"
                {...register("receiverCenter", { required: true })}
                disabled={!receiverRegion}
              >
                <option value="">Select Service Center</option>
                {serviceCenters
                  .filter(item => item.region === receiverRegion)
                  .map(item => (
                    <option key={item.id} value={item.district}>
                      {item.district}
                    </option>
                  ))}
              </select>

              <textarea
                className="textarea textarea-bordered"
                placeholder="Delivery Address"
                {...register("receiverAddress", { required: true })}
              />

              <textarea
                className="textarea textarea-bordered"
                placeholder="Delivery Instruction"
                {...register("deliveryInstruction", { required: true })}
              />
            </div>
          </div>

        </div>

        {/* ================= Submit ================= */}
        <div className="text-center">
          <button className="btn btn-primary px-10 text-black">
            Submit Parcel
          </button>
        </div>
      </form>
    </div>
  );
};

export default SendParcel;
