import dbConnect from '../../utils/dbConnect'
import Short from '../../models/Short'

export default async function handler(req, res) {
    const { query: { shortId }, method, body: { shortIdOld } } = req

    await dbConnect()

    switch (method) {
        case 'GET': //GET method, faremos o redirecionamento do usuario pra o URL final
            try {
                const short = await Short.findOne({ shortId: shortId, shortDeleted: false })
                if (!short) {
                    return res.status(400).json({ sucess: false })
                }

                short.hits++
                short.save()

                res.status(200).redirect(short.urlDest)
            } catch (error) {
                return res.status(400).json({ sucess: false })
            }
            break
        case 'PUT':
            try {
                const short = await Short.findOneAndUpdate({ shortId: shortIdOld, shortDeleted: false }, req.body, {
                    new: true,
                    runValidators: true,
                })

                if (!short) {
                    return res.status(400).json({ success: false, message: "This shortIdOld not exists" })
                }

                res.status(200).json({ success: true, data: short })
            } catch (error) {
                return res.status(400).json({ success: false })
            }
            break
        case 'DELETE':
            try {
                const deletedShort = await Short.findOneAndUpdate({ shortId: shortId, shortDeleted: false }, { shortDeleted: true })

                if (!deletedShort) {
                    return res.status(400).json({ success: false, message: "This shortId not exists" })
                }

                res.status(200).json({ success: true, data: deletedShort })
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break

        default:
            res.status(400).json({ success: false })
            break
    }
}