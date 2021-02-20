import dbConnect from '../../utils/dbConnect'
import Short from '../../models/Short'

export default async function handler(req, res) {
  const { method } = req

  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        const shorts = await Short.find({ shortDeleted: false })
        res.status(200).json({ sucess: true, data: shorts })
      } catch (error) {
        res.status(400).json({ sucess: false })
      }
      break

    case 'POST':
      try {

        const exists = await Short.findOne({ shortId: req.body.shortId, shortDeleted: false })

        if (!exists) {
          const short = await Short.create(req.body)
          res.status(201).json({ sucess: true, data: short })
        } else {
          res.status(400).json({ sucess: false, message: "This shortId already exists" })

        }


      } catch (error) {
        res.status(400).json({ sucess: false })
      }
      break

    default:
      res.status(400).json({ sucess: false })
      break
  }
}