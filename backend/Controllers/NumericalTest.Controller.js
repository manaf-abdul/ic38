export const postNumericalTest = async (req, res) => {
    console.log("============ADD oneliner===========");
    try {
        const {content,language,category}=req.body
        let newOneLIner=new OneLiner({
            content, 
            language:language ,
            superCategory: category
        })
        newOneLIner=await newOneLIner.save()
        return res.status(200).json({ errorcode: 0, status: true, msg: "OneLiner Created Successfully", data: newOneLIner });
    } catch (e) {
        // console.log(e)
        return res.status(200).json({ errorcode: 5, status: false, msg: e.message, data: e });
    }
}

export const getAllNumericalTest = async (req, res) => {
    console.log("============ADD oneliner===========");
    try {
        const {language,category}=req.body
        let newOneLIner=new OneLiner({
            content, 
            language:language ,
            superCategory: category
        })
        newOneLIner=await newOneLIner.save()
        return res.status(200).json({ errorcode: 0, status: true, msg: "OneLiner Created Successfully", data: newOneLIner });
    } catch (e) {
        // console.log(e) 
        return res.status(200).json({ errorcode: 5, status: false, msg: e.message, data: e });
    }
}