import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import { useLoaderData } from "react-router";

const SendParcel = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({
    defaultValues: {
      senderName: ""
    }
  });

  const { user } = useAuth();

  const serviceCenters = useLoaderData();

  /* ================= Derived Data ================= */
  const regions = [...new Set(serviceCenters.map(item => item.region))];

  /* ================= Watches ================= */
  const parcelType = watch("type");
  const senderRegion = watch("senderRegion");
  const receiverRegion = watch("receiverRegion");

  /* ================= Pricing Logic ================= */
  const calculateCost = ({ type, weight = 0, senderCenter, receiverCenter }) => {
    const withinDistrict = senderCenter === receiverCenter;

    // Document
    if (type === "document") {
      return withinDistrict ? 60 : 80;
    }

    // Non-document
    let cost = withinDistrict ? 110 : 150;

    if (weight > 3) {
      const extraKg = Math.ceil(weight - 3);
      cost += extraKg * 40;

      if (!withinDistrict) {
        cost += 40; // extra outside district charge
      }
    }

    return cost;
  };

  /* ================= Custom Toast ================= */
  // const showConfirmToast = (data) => {
  //   toast.custom(
  //     (t) => (
  //       <div
  //         className={`card w-96 bg-base-100 border border-gray-300 shadow-xl
  //         transition-all ${t.visible ? "scale-100" : "scale-95 opacity-0"}`}
  //       >
  //         <div className="card-body space-y-3">
  //           <h3 className="text-lg font-semibold text-center">
  //             Confirm Parcel
  //           </h3>

  //           <p className="text-sm text-gray-500 text-center">
  //             Please review before confirming your parcel.
  //           </p>

  //           <div className="divider my-1"></div>

  //           <p className="text-center text-xl font-bold text-primary">
  //             Estimated Cost: ৳{data.cost}
  //           </p>

  //           <div className="flex gap-3 mt-4">
  //             <button
  //               className="btn btn-outline btn-sm flex-1"
  //               onClick={() => toast.dismiss(t.id)}
  //             >
  //               Cancel
  //             </button>

  //             <button
  //               className="btn btn-primary btn-sm flex-1 text-white"
  //               onClick={() => {
  //                 console.log("Confirmed Parcel:", {
  //                   ...data,
  //                   creation_date: new Date().toISOString(),
  //                 });

  //                 toast.dismiss(t.id);
  //                 toast.success("Parcel confirmed & saved!");
  //               }}
  //             >
  //               Confirm
  //             </button>
  //           </div>
  //         </div>
  //       </div>
  //     ),
  //     { duration: Infinity, position: "top-center" }
  //   );
  // };

  /* ================= Submit ================= */
  const onSubmit = (data) => {
    const {
      type,
      weight = 0,
      senderCenter,
      receiverCenter,
    } = data;

    const withinDistrict = senderCenter === receiverCenter;
    const breakdown = [];
    let total = 0;

    // -------- Document --------
    if (type === "document") {
      total = withinDistrict ? 60 : 80;

      breakdown.push({
        label: "Document Delivery",
        amount: withinDistrict ? 60 : 80,
      });
    }

    // -------- Non-Document --------
    if (type === "non-document") {
      const base = withinDistrict ? 110 : 150;
      breakdown.push({
        label: "Base Charge (up to 3kg)",
        amount: base,
      });

      total += base;

      if (weight > 3) {
        const extraKg = Math.ceil(weight - 3);
        const extraWeightCost = extraKg * 40;

        breakdown.push({
          label: `Extra Weight (${extraKg}kg × ৳40)`,
          amount: extraWeightCost,
        });

        total += extraWeightCost;

        if (!withinDistrict) {
          breakdown.push({
            label: "Outside District Surcharge",
            amount: 40,
          });

          total += 40;
        }
      }
    }

    // -------- SweetAlert --------
    Swal.fire({
      title: "Review & Confirm Pricing",
      width: 500,
      html: `
      <div style="text-align:left;font-size:14px">
        <p><strong>Route:</strong> ${senderCenter} → ${receiverCenter}</p>
        <p><strong>Parcel Type:</strong> ${type}</p>
        <hr/>

        ${breakdown
          .map(
            (item) =>
              `<div style="display:flex;justify-content:space-between;margin:6px 0">
                <span>${item.label}</span>
                <strong>৳${item.amount}</strong>
              </div>`
          )
          .join("")}

        <hr/>
        <div style="display:flex;justify-content:space-between;font-size:18px;margin-top:10px">
          <strong>Total</strong>
          <strong style="color:#16a34a">৳${total}</strong>
        </div>
      </div>
    `,
      showCancelButton: true,
      confirmButtonText: "Proceed to Payment",
      cancelButtonText: "Go Back & Edit",
      confirmButtonColor: "#16a34a",
      cancelButtonColor: "#64748b",
      focusConfirm: false,
    }).then((result) => {
      if (result.isConfirmed) {
        const payload = {
          ...data,
          cost: total,
          created_by: user.email,
          payment_status: "Unpaid",
          delivery_status: "Not collected",
          creation_date: new Date().toISOString(),
        };

        console.log("Proceed to payment with:", payload);

        Swal.fire({
          icon: "success",
          title: "Redirecting to Payment",
          text: "Please complete your payment to confirm the parcel.",
          timer: 2000,
          showConfirmButton: false,
        });

        // 👉 redirect or open payment modal here
        // navigate("/payment", { state: payload });
      }
    });
  };



  return (
    <div className="max-w-5xl mx-auto p-6 bg-base-100">
      {/* <Toaster
        position="top-center"
        toastOptions={{
          style: { background: "transparent", boxShadow: "none" },
        }}
      /> */}

      {/* Heading */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold">Send a Parcel</h1>
        <p className="text-primary">
          Provide pickup & delivery information to send your parcel
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

        {/* Parcel Info */}
        <div className="card border border-gray-600 shadow p-8">
          <h2 className="text-xl font-semibold mb-4">Parcel Info</h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="form-control">
              <label className="label font-medium">Parcel Type</label>
              <div className="flex gap-6">
                <label className="flex items-center gap-2">
                  <input type="radio" value="document" className="radio radio-primary" {...register("type", { required: true })} />
                  Document
                </label>
                <label className="flex items-center gap-2">
                  <input type="radio" value="non-document" className="radio radio-primary" {...register("type", { required: true })} />
                  Non-Document
                </label>
              </div>
            </div>

            <input
              className="input input-bordered"
              placeholder="Parcel Name"
              {...register("title", { required: true })}
            />

            {parcelType === "non-document" && (
              <input
                type="number"
                step="0.1"
                className="input input-bordered"
                placeholder="Weight (kg)"
                {...register("weight")}
              />
            )}
          </div>
        </div>

        {/* Sender & Receiver */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Sender */}
          <div className="card border border-gray-600 shadow p-8">
            <h2 className="text-xl font-semibold mb-4">Sender Info</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <input className="input input-bordered" placeholder="Sender Name" {...register("senderName", { required: true })} />
              <input className="input input-bordered" placeholder="Contact Number" {...register("senderContact", { required: true })} />

              <select className="select select-bordered" {...register("senderRegion", { required: true })}>
                <option value="">Select Region</option>
                {regions.map(r => <option key={r}>{r}</option>)}
              </select>

              <select className="select select-bordered" {...register("senderCenter", { required: true })} disabled={!senderRegion}>
                <option value="">Select Service Center</option>
                {serviceCenters.filter(i => i.region === senderRegion).map(i => (
                  <option key={i.id} value={i.district}>{i.district}</option>
                ))}
              </select>

              <textarea className="textarea textarea-bordered" placeholder="Pickup Address" {...register("senderAddress", { required: true })} />
              <textarea className="textarea textarea-bordered" placeholder="Pickup Instruction" {...register("pickupInstruction", { required: true })} />
            </div>
          </div>

          {/* Receiver */}
          <div className="card border border-gray-600 shadow p-8">
            <h2 className="text-xl font-semibold mb-4">Receiver Info</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <input className="input input-bordered" placeholder="Receiver Name" {...register("receiverName", { required: true })} />
              <input className="input input-bordered" placeholder="Contact Number" {...register("receiverContact", { required: true })} />

              <select className="select select-bordered" {...register("receiverRegion", { required: true })}>
                <option value="">Select Region</option>
                {regions.map(r => <option key={r}>{r}</option>)}
              </select>

              <select className="select select-bordered" {...register("receiverCenter", { required: true })} disabled={!receiverRegion}>
                <option value="">Select Service Center</option>
                {serviceCenters.filter(i => i.region === receiverRegion).map(i => (
                  <option key={i.id} value={i.district}>{i.district}</option>
                ))}
              </select>

              <textarea className="textarea textarea-bordered" placeholder="Delivery Address" {...register("receiverAddress", { required: true })} />
              <textarea className="textarea textarea-bordered" placeholder="Delivery Instruction" {...register("deliveryInstruction", { required: true })} />
            </div>
          </div>

        </div>

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
