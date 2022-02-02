import Dwitter from './Dwitter.json';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';

const ContractABI = Dwitter.abi;
const ContractAddress = '0x75fe16D81a07d235f4e454a3FB62572022dEA9Ac';
// const ContractAddress = '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512';
const Ethereum = typeof window !== 'undefined' && (window as any).ethereum;

const getDwitterContract = () => {
  const provider = new ethers.providers.Web3Provider(Ethereum);
  const signer = provider.getSigner();
  return new ethers.Contract(ContractAddress, ContractABI, signer);
};

type User = {
  avatar: string;
  bio: string;
  name: string;
  username: string;
  wallet: string;
};

type Dweet = {
  content: string;
  timestamp: number;
  author: string;
  likes: number
}

const useDwitter = () => {
  const [currentAccount, setCurrentAccount] = useState<string>('');
  const [dweets, setDweets] = useState<Dweet[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const connect = async () => {
    try {
      if (!Ethereum) {
        alert('Please install MetaMask');
        return;
      }
      const accounts = await Ethereum.request({
        method: 'eth_requestAccounts',
      });
      if (accounts.length === 0) {
        console.log('No authorized accounts');
        return;
      }

      const account = accounts[0];
      console.log('Connected to account: ', account);
      setCurrentAccount(account);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (!Ethereum) {
      console.log('No ethereum wallets found, please get metamask');
      return;
    }
    connect();
    getDweets();
  }, []);

  useEffect(() => {
    if (currentAccount) {
      getUser();
      getDweets();
    }
  }, [currentAccount]);

  const getUser = async () => {
    const contract = getDwitterContract();
    const user = await contract.getUser(currentAccount);
    const { avatar, bio, name, username, wallet } = user;
    setCurrentUser({ avatar, bio, name, username, wallet });
    return user;
  };

  const createUser = async (
    username: string,
    name: string,
    bio: string,
    avatar: string
  ) => {
    const contract = getDwitterContract();
    const user = await contract.signup(username, name, bio, avatar);
    console.log(user);
    getUser();
  };

  const postDweet = async (dweet: string) => {
    const contract = getDwitterContract();
    await contract.postDweet(dweet);
    await getDweets();
  };

  const getDweets = async () => {
    const contract = getDwitterContract();
    const dweets = await contract.getDweets();
    console.log(dweets);
    setDweets(dweets);
  }

  return { connect, account: currentAccount, user: currentUser, createUser, postDweet, dweets };
};

export default useDwitter;
