import prisma from "../DB/db.config.js";

export const getAllUser = async (req, res) => {
    try {
        const users = await prisma.user.findMany({});
        return res.json({ status: 200, data: users })
    }
    catch (error) {
        console.error('An error occurred:', error.message);
        return res.status(500).json({ success: false, error: 'An internal server error occurred' });
    }
}
export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);
        const user= await prisma.user.findFirst({
            where:{
                id:Number(id)
            }
        });
        return res.json({ status: 200, data: user })
    }
    catch (error) {
        console.error('An error occurred:', error.message);
        return res.status(500).json({ success: false, error: 'An internal server error occurred' });
    }
}

export const createUser = async (req, res) => {
    try {
        console.log(req.body)
        const { name, email, password } = req.body;

        const findUser = await prisma.user.findUnique({
            where: {
                email: email,
            }
        })

        if (findUser) {
            return res.json({ status: 400, message: "Email already Taken Use New Email" })
        }

        const newUser = await prisma.user.create({
            data: {
                name: name,
                email: email,
                password: password
            }
        })
        return res.json({ success: true, data: newUser });
    }
    catch (error) {
        console.error('An error occurred:', error.message);
        return res.status(500).json({ success: false, error: 'An internal server error occurred' });
    }
}

export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id)
        const { name, email, password } = req.body;

        await prisma.user.update({
            where: {
                id: Number(id)
            },
            data: {
                name,
                email,
                password
            }
        })

        return res.json({ message: "The User is updated" });
    }
    catch (error) {
        console.error('An error occurred:', error.message);
        return res.status(500).json({ success: false, error: 'An internal server error occurred' });
    }

}

export const deleteUserById = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id)

        await prisma.user.delete({
            where: {
                id: Number(id)
            }
        })

        return res.json({ message: "The User is deleted" });
    }
    catch (error) {
        console.error('An error occurred:', error.message);
        return res.status(500).json({ success: false, error: 'An internal server error occurred' });
    }

}

