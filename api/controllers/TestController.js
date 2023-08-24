const prisma = require('../../db/prisma')

const TestController = {
    async test(req, res) {
        const helloworld = await prisma.test.findFirst();
        return res.status(200).json(helloworld);
    },

    async otherTest(req, res) {
        const createdTest = await prisma.othertest.create({
            data: req.body
        })

        return res.status(200).json(createdTest);

    }
}

module.exports = TestController;