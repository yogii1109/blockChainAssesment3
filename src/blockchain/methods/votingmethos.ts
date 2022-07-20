import { votinginstance } from "../contract/instance";

export const getCandidateDetails = async (id: number) => {
    try{
        let candidate = await votinginstance.methods.candidates(id).call();
        return candidate;
    }catch (error){
        console.log(error)
    }
}

export const candidatesCount = async () => {
    try{
        let candidateCount = await votinginstance.methods.candidatesCount().call();
        console.log(candidateCount)
        return candidateCount;
    }catch (error){
        console.log(error)
    }
}

export const ifvoter = async (account : string) => {
    try{
        let boolValue = await votinginstance.methods.voters(account).call();
        console.log(boolValue)
        return boolValue;
    }catch (error){
        console.log(error)
    }

}

export const vote = async (id :number , account: string) => {
    try{
        let votes = await votinginstance.methods.vote(id).send({from  : account});
        console.log(votes)
        return votes;
    }catch (error){
        console.log(error)
    }

}