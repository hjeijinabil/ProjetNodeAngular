const Solution = require('../Models/Solution');
const User = require('../Models/user');

const { StatusCodes } = require('http-status-codes');



const createSolution = async (req, res) => {
  console.log(req.body)
  req.body.lawyer = req.user.id;
  const solution = await Solution.create(req.body);
  if (solution)
    return res.status(StatusCodes.CREATED).json({ solution });
  else
    return res.status(StatusCodes.BAD_REQUEST).json({ msg : 'invalid data' });
  
};

const getQuestionSolutions = async (req, res) => {
  const { id: questionId } = req.params;
  const solutions = await Solution.find({ })
  if (solutions)
    return res.status(StatusCodes.OK).json({ solutions });
  else 
    return res.status(StatusCodes.NOT_FOUND).json({ msg : `No solutions with question id ${questionId}` });
};



module.exports = {
  createSolution,
  getQuestionSolutions,
};
