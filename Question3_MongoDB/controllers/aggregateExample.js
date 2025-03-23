import { db } from "../config/connection";

const aggregateExample = async (re, res, next) => {
  try {
    const storeMonthlySales = await db.sales.aggregate([
      {
        $unwind: "$items",
      },
      {
        $group: {
          _id: {
            store: "$store",
            month: { $dateToString: { format: "%Y-%m", date: "$date" } },
          },
          totalRevenue: {
            $sum: {
              $multiply: ["$items.quantity", "$items.price"],
            },
          },
          totalQuantity: { $sum: "$items.quantity" },
          totalPrice: { $sum: "$items.price" },
        },
      },
      {
        $project: {
          _id: 0,
          store: "$_id.store",
          month: "$_id.month",
          totalRevenue: 1,
          averagePrice: {
            $divide: ["$totalPrice", "$totalQuantity"],
          },
        },
      },
      {
        $sort: { store: 1, month: 1 },
      },
    ]);

    return res
      .status(200)
      .json({ message: "Store Wise Monthly Sales", data: storeMonthlySales, status: 200 });
  } catch (error) {
    console.error("Error fetching sales data: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export { aggregateExample };
