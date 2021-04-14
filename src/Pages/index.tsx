import React, { useEffect, useState } from 'react'
import '../assets/index.scss'
import { Input, message, Button, Spin } from 'antd'
import { Container, ContentScroll } from './style'
import { getUserData, getYears, getMakes, getModels } from '../Api/index'
import { Select } from 'antd'
const { Option } = Select

interface vehicle {
	year: string
	make: string
	model: string
}
interface userData {
	email: string
	name: {
		first: string
		last: string
	}
	phone: {
		countryCode: string
		phoneNumber: string
	}
	vehicles: Array<vehicle>
}
type tempYears = Array<number>
type tempMakes = Array<string>
type tempModels = Array<string>
export const Main = function () {
	const tempData: Partial<userData> = {}
	const [nextPage, setNextPage] = useState(false)
	const [display, setDisplay] = useState(false)
	const [userData, setUserData] = useState(tempData)
	const [phone, setPhone] = useState('')
	const [yearList, setYearList] = useState([] as tempYears)
	const [makeList, setMakeList] = useState([] as tempMakes)
	const [modelList, setModelList] = useState([] as tempModels)
	const [selectedYear, setSelectedYear] = useState('')
	const [selectedMake, setSelectedMake] = useState('')
	const [selectedModel, setSelectedModel] = useState('')
	const [all, setAll] = useState('')
	useEffect(() => {}, [])
	const searchPhone = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (phone !== '' && phone !== '6479887765') message.error('No such user')
		if (!userData.email && !nextPage) {
			getUserData(phone).then((res) => {
				console.log(res)
				setUserData(res as any)
				console.log('fetched data')
			})
		}
		if (yearList.length === 0) {
			getYears().then((res: any) => {
				setYearList(res.years)
			})
		}
	}
	function handleChange(value: any) {
		console.log(`selected ${value}`)
	}
	const phoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const val = e.target.value
		setPhone(val)
	}
	const changeYear = (year: any) => {
		console.log(year)
		setSelectedYear(year)

		if (makeList.length === 0) {
			getMakes(year).then((res: any) => {
				setMakeList(res.makes)
				console.log()
			})
		}
	}
	const changeMake = (make: any) => {
		console.log(make)
		setSelectedMake(make)
		if (modelList.length === 0) {
			getModels(selectedYear, make).then((res: any) => {
				setModelList(res.models)
			})
		}
	}
	const changeModel = (value: any) => {
		console.log(value)
		setSelectedModel(value)
	}
	const selectAll = (value: any) => {
		setAll(value)
	}

	return (
		<Container>
			<div className='content_body'>
				<div className='content_body_room'>
					{nextPage ? (
						<div>
							<h2 style={{ textAlign: 'center' }}> Booking Info</h2>
							<div style={{ backgroundColor: '#C1EFF2', height: '300px', width: '100%' }}>
								<div style={{ paddingTop: '20px' }}>
									{' '}
									<strong>Phone: +1</strong> {userData.phone?.phoneNumber}
								</div>
								<div style={{ marginTop: '20px' }}>
									<strong>Name:</strong> {userData.name?.first} {userData.name?.last}
								</div>
								<div style={{ marginTop: '20px' }}>
									<strong>Email:</strong> {userData.email}
								</div>
								<div style={{ marginTop: '20px' }}>
									<strong>Vehicle: </strong>
									{all === '' ? selectedYear + selectedMake + selectedModel : all}
								</div>
							</div>
							<div style={{ marginTop: '100px' }}>
								<Button
									type='primary'
									style={{ float: 'right' }}
									onClick={() => {
										message.success('Successfully Booked,Thank you')
									}}
								>
									{' '}
									Book
								</Button>
							</div>
						</div>
					) : (
						<div>
							<h2 style={{ textAlign: 'center' }}>Start a Booking</h2>
							<div>
								<div>Phone</div>
								<Input placeholder='+1' style={{ backgroundColor: 'red', display: 'inline-block', width: '10%' }} />
								<Input
									placeholder='xxx - xxx - xxxx'
									value={phone}
									onPressEnter={(e: any) => {
										searchPhone(e)
									}}
									onChange={phoneChange}
									style={{ display: 'inline-block', width: '90%' }}
								/>
							</div>
							<div>Name</div>
							<Select style={{ width: '50%' }} defaultValue='FirstName' onChange={handleChange}>
								{userData.name?.first ? <Option value='first'>{userData.name?.first}</Option> : null}
							</Select>
							<Select style={{ width: '50%' }} defaultValue='SecondName' onChange={handleChange}>
								{userData.name?.last ? <Option value='last'>{userData.name?.last}</Option> : null}
							</Select>
							<div>Email</div>
							<Select style={{ width: '50%' }} defaultValue='SecondName' onChange={handleChange}>
								{userData.email ? <Option value='email'>{userData.email}</Option> : null}
							</Select>

							<div style={{ marginTop: '20px' }}>Select Vehicle</div>
							<Select onChange={selectAll} style={{ width: '100%' }} defaultValue='Select vehicle'>
								{userData.vehicles?.map((item) => {
									return (
										<Option value={item.year + item.make + item.model} key={item.year + item.make}>
											{item.year} {item.make} {item.model}
										</Option>
									)
								})}
							</Select>
							<div style={{ marginTop: '20px' }}>
								{' '}
								<Button
									type='primary'
									onClick={() => {
										if (!userData.email) {
											message.error('Please enter your phone number')
											return
										} else {
											setDisplay(true)
										}
									}}
								>
									{' '}
									+ Add New
								</Button>
							</div>
							{display ? (
								<div>
									<div style={{ marginTop: '20px' }}>
										<span style={{ paddingLeft: '40px', display: 'inline-block', width: '30%' }}>Vehicle Year</span>
										<span style={{ paddingLeft: '40px', display: 'inline-block', width: '30%' }}>Vehicle Make</span>
										<span style={{ width: '30%', paddingLeft: '40px', display: 'inline-block' }}>Vehicle Model</span>
									</div>
									<div>
										<Select onChange={changeYear} style={{ width: '30%', marginRight: '3%' }} defaultValue='Year'>
											{yearList?.map((item) => {
												return (
													<Option value={item} key={item}>
														{item}
													</Option>
												)
											})}
										</Select>
										<Select onChange={changeMake} style={{ width: '30%', marginRight: '3%' }} defaultValue='Makes'>
											{makeList?.map((item) => {
												return (
													<Option value={item} key={item}>
														{item}
													</Option>
												)
											})}
										</Select>
										<Select onChange={changeModel} style={{ width: '30%', marginRight: '3%' }} defaultValue='Models'>
											{/* <Option value='jack'>Jack</Option> */}
											{modelList?.map((item) => {
												return (
													<Option value={item} key={item}>
														{item}
													</Option>
												)
											})}
										</Select>
									</div>
								</div>
							) : null}

							<div style={{ marginTop: '20px' }}>
								<Button
									type='primary'
									style={{ float: 'right' }}
									onClick={() => {
										if (!userData.email) {
											message.error('Please enter your phone number')
											return
										}
										if (all === '') {
											message.error('Please select your vehicle model')
											return
										}
										setNextPage(true)
									}}
								>
									Next Phase
								</Button>
							</div>
						</div>
					)}
				</div>
			</div>
		</Container>
	)
}
