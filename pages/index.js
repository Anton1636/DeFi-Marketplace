import React, { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { useStateContext } from '../context/index'

import Header from '@/components/Header'
import PreSaleList from '@/components/PreSaleList'
import UploadLogo from '@/components/UploadLogo'
import Loader from '@/components/Loader'
import Footer from '@/components/Footer'
import ICOMarket from '@/components/ICOMarket'
import TokenCreator from '@/components/TokenCreator'
import TokenHistory from '@/components/TokenHistory'
import Marketplace from '@/components/Marketplace'
import CreateICO from '@/components/CreateICO'
import Card from '@/components/Card'
import BuyToken from '@/components/BuyToken'
import WithdrawToken from '@/components/WithdrawToken'
import TokenTransfer from '@/components/TokenTransfer'
import { ICO_MARKETPLACE_ADDRESS } from '@/context/constants'

export default function Home() {
	const {
		withdrawToken,
		transferToken,
		buyToken,
		createICOSALE,
		GET_ALL_ICOSALE_TOKEN,
		GET_ALL_USER_ICOSALE_TOKEN,
		createERC20,
		connectWallet,
		openBuyToken,
		setOpenBuyToken,
		openWithdrawToken,
		setOpenWithdraw,
		openTransferToken,
		setOpenTransferToken,
		openTokenCreator,
		setOpenTokenCreator,
		openCreateICO,
		setOpenCreateICO,
		address,
		setAddress,
		accountBalance,
		loader,
		setLoader,
		currency,
		PINATA_AIP_KEY,
		PINATA_SECRET_KEY,
		shortenAddress,
		reCall,
	} = useStateContext()

	const notifySuccess = msg => toast.success(msg, { duration: 3000 })
	const notifyError = msg => toast.error(msg, { duration: 3000 })

	const [allICOs, setAllICOs] = useState()
	const [allUserICOs, setAllUSeICOs] = useState()
	const [openAllICO, setOpenAllICO] = useState(false)
	const [openTokenHistory, setOpenTokenHistory] = useState(false)
	const [openICOMarketplace, setOpenICOMarketplace] = useState(false)
	const [buyICO, setBuyICO] = useState()

	const copyAddress = () => {
		navigator.clipboard.writeText(ICO_MARKETPLACE_ADDRESS)
		notifySuccess('Copied successfully')
	}

	useEffect(() => {
		if (address) {
			GET_ALL_ICOSALE_TOKEN().then(token => {
				console.log('ALL', token)
				setAllICOs(token)
			})
			GET_ALL_USER_ICOSALE_TOKEN().then(token => {
				console.log('USER', token)
				setAllUSeICOs(token)
			})
		}
	}, [address, reCall])

	return (
		<div>
			<Header
				accountBalance={accountBalance}
				setAddress={setAddress}
				address={address}
				connectWallet={connectWallet}
				ICO_MARKETPLACE_ADDRESS={ICO_MARKETPLACE_ADDRESS}
				shortenAddress={shortenAddress}
				setOpenAllICO={setOpenAllICO}
				openAllICO={openAllICO}
				setOpenTokenCreator={setOpenTokenCreator}
				openTokenCreator={openTokenCreator}
				setOpenTokenHistory={setOpenTokenHistory}
				openTokenHistory={openTokenHistory}
				setOpenICOMarketplace={setOpenICOMarketplace}
				openICOMarketplace={openICOMarketplace}
			/>
			<div className='create'>
				<h1 style={{ fontSize: '2rem' }}>All ICOs Marketplace</h1>

				{allICOs?.length != 0 && (
					<Marketplace
						array={allICOs}
						shortenAddress={shortenAddress}
						setBuyICO={setBuyICO}
						setOpenBuyToken={setOpenBuyToken}
						currency={currency}
					/>
				)}

				<Card
					setOpenAllICO={setOpenAllICO}
					setOpenTokenCreator={setOpenTokenCreator}
					setOpenTransferToken={setOpenTransferToken}
					setOpenTokenHistory={setOpenTokenHistory}
					setOpenWithdraw={setOpenWithdraw}
					setOpenICOMarketplace={setOpenICOMarketplace}
					copyAddress={copyAddress}
					setOpenCrateICO={setOpenCreateICO}
				/>
			</div>
			{openAllICO && (
				<ICOMarket
					array={allICOs}
					shortenAddress={shortenAddress}
					handleClick={setOpenAllICO}
					currency={currency}
				/>
			)}
			{openTokenCreator && (
				<TokenCreator
					createERC20={createERC20}
					shortenAddress={shortenAddress}
					setOpenTokenCreator={setOpenTokenCreator}
					setLoader={setLoader}
					address={address}
					connectWallet={connectWallet}
					PINATA_AIP_KEY={PINATA_AIP_KEY}
					PINATA_SECRET_KEY={PINATA_SECRET_KEY}
				/>
			)}
			{openTokenHistory && (
				<TokenHistory
					shortenAddress={shortenAddress}
					setOpenTokenHistory={setOpenTokenHistory}
				/>
			)}
			{openCreateICO && (
				<CreateICO
					shortenAddress={shortenAddress}
					setOpenCreateICO={setOpenCrateICO}
					connectWallet={connectWallet}
					address={address}
					createICOSALE={createICOSALE}
				/>
			)}
			{openICOMarketplace && (
				<ICOMarket
					array={allUserICOs}
					shortenAddress={shortenAddress}
					handleClick={setOpenICOMarketplace}
					currency={currency}
				/>
			)}
			{openBuyToken && (
				<BuyToken
					address={address}
					buyToken={buyToken}
					connectWallet={connectWallet}
					setOpenBuyToken={setOpenBuyToken}
					buyICO={buyICO}
					currency={currency}
				/>
			)}
			{openTransferToken && (
				<TokenTransfer
					address={address}
					transferToken={transferToken}
					connectWallet={connectWallet}
					setOpenTransferToken={setOpenTransferToken}
				/>
			)}
			{openWithdrawToken && (
				<WithdrawToken
					address={address}
					withdrawToken={withdrawToken}
					connectWallet={connectWallet}
					setOpenWithdraw={setOpenWithdraw}
				/>
			)}
			<Footer />
			{loader && <Loader />}
		</div>
	)
}
