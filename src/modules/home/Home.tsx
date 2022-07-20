import { useWeb3React } from "@web3-react/core";
import * as Styled from "./style"
import Profile from "../../assets/images/profile.jpg"
import { injector } from "../../blockchain/wallet/wallet";
import { useEffect, useState } from "react";
import {
  getCandidateDetails, candidatesCount
  , ifvoter, vote
} from "../../blockchain/methods/votingmethos";
import { objectTraps } from "immer/dist/internal";

interface I_Candiate {
  id: Number,
  candidateName: string,
  voteCount: Number
}

export const Home = () => {
  const [totalCandidate, setTotalCandidate] = useState<Number>(0);
  const [candidate, setCandidate] = useState<any>([])
  const [alreadyVoted , setalreadyVoted] = useState<boolean>(false)
  const {
    account,
    chainId,
    deactivate,
    activate,
    active: connected,
  } = useWeb3React<any>();

  const getCandidateCount = async () => {
    const result = await candidatesCount();
    setTotalCandidate(result);

  }

  const checkIfAlreadyVoted = async(account : string) => {
    const boolValue =  await ifvoter(account)
    setalreadyVoted(boolValue)
  }

  const getCandidateDetail = async () => {
    let resultArray = [];
    for (let i = 1; i <= totalCandidate; i++) {
      const result = await getCandidateDetails(i);
      console.log(result)
      const object = {
        name: result.name,
        voteCount: result.voteCount,
        id: result.id
      }
      resultArray.push(object)

    }
    setCandidate([...resultArray])
  }

  useEffect(() => {
    if (account) {
      getCandidateCount()
      checkIfAlreadyVoted(account)
    }
  }, [account])

  useEffect(() => {
    if (totalCandidate) {
      getCandidateDetail()
    }
  }, [totalCandidate])


  const connectWallet = () => {
    activate(injector)
  }
  console.log(candidate.length)
  return (
    <>
      {account ? <Styled.Container>
        <Styled.Connected>Connected</Styled.Connected>
        <Styled.Wrapper>
          <Styled.CardContainer>
            { candidate?.length > 0  && candidate?.map((item: any , index: number) => (
              <Styled.Card key={index}>
                <Styled.CardImg><img src={Profile} /></Styled.CardImg>
                <Styled.CandidateName>{item.name} </Styled.CandidateName>
                <Styled.CandidateName>Vote Count {item.voteCount}</Styled.CandidateName>
                <Styled.Button disabled={alreadyVoted} onClick={() => vote(index, account)}>{alreadyVoted ? "Already Voted" : "Vote"}</Styled.Button>
              </Styled.Card>
            ))}
          </Styled.CardContainer>
        </Styled.Wrapper>
      </Styled.Container> :
        <Styled.ButtonText onClick={connectWallet}>Please Connect to Wallet</Styled.ButtonText>}
    </>
  )
}

export default Home