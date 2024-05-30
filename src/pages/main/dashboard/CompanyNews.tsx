import { Card } from "antd"
import axios from "axios"
import React, { useEffect, useState } from "react"
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io"
import { baseUrl } from "../../../utils/environments/environment"
import { companyNewsProps } from "../../../utils/Interface/Dashboard"

const CompanyNews: React.FC = () => {
  const [dataCompanyNews, setDataCompanyNews] = useState<companyNewsProps[]>([])

  const editCompanyNewsShow = (index: number, newValue: boolean) => {
    const newData = [...dataCompanyNews]
    newData[index] = { ...newData[index], isShow: newValue }
    setDataCompanyNews(newData)
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}company-news/get-company-news`
        )
        setDataCompanyNews(response.data)
      } catch (error: any) {
        console.log(error)
      }
    }

    fetchData()
  }, [])
  return (
    <Card
      className="w-full shadow shadow-blue-300"
      title={
        <div className="text-slate-600 text-lg font-bold">Company News</div>
      }
    >
      {dataCompanyNews.map((item, index) => (
        <div key={index}>
          <div className="flex justify-between items-center text-slate-500 pb-2">
            <h1 className="text-sm font-semibold">{item.title}</h1>
            <div
              className="cursor-pointer"
              onClick={() => editCompanyNewsShow(index, !item.isShow)}
            >
              {item.isShow ? (
                <IoIosArrowDown className="text-lg" />
              ) : (
                <IoIosArrowForward className="text-lg" />
              )}
            </div>
          </div>
          {item.isShow && (
            <div className="pl-2 text-justify text-slate-400 text-sm">
              {item.subject_image && (
                <img src={item.subject_image} alt="Subject Image" />
              )}
              <div
                dangerouslySetInnerHTML={{ __html: item.subject_information }}
              ></div>
            </div>
          )}
        </div>
      ))}
    </Card>
  )
}

export default CompanyNews
