using System;
using System.Data;
using System.Data.Common;
using System.Data.SqlClient;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Data;
using Microsoft.Practices.EnterpriseLibrary.Data.Sql;
namespace DataProvider
{
    public partial class CEnterpriceLibrary
    {
        /// <summary>
        /// String conect to database
        /// </summary>
        //public static string sConnectionString = @"Server=10.70.99.3;Database=dbQLVT_CAPQUANG;uid=qlvtcq;pwd=123456@VTCQ;Connect Timeout=20;";
		public static string sConnectionString = ConfigurationManager.ConnectionStrings["SQLServer"].ConnectionString;
        
        #region EXECUTEDATASET

        /// <summary>
        
        /// </summary>
        private static void getConectString()
        {
            DataProvider.CEnterpriceLibrary.sConnectionString = @"Server=10.70.37.3;Database=dbQLVT_CAPQUANG;uid=qlvtcq;pwd=123456@VTCQ;Connect Timeout=40;";
        }

        /// <summary>
        /// Executes the dataset.
        /// </summary>
        /// <param name="ds">The dataset return.</param>
        /// <param name="store">The store procedure.</param>
        /// <param name="paras">The parameter.</param>
        public static void ExecuteDataset(ref DataSet ds, string store, params object[] paras)
        {
            SqlDatabase _dt = new SqlDatabase(sConnectionString);

            using (DbConnection connect = _dt.CreateConnection())
            {
                try
                {
                    if (connect.State == ConnectionState.Closed)
                        connect.Open();
                    if (connect.State == ConnectionState.Open)
                    {
                        ds = _dt.ExecuteDataSet(store, paras);
                    }
                    connect.Close();
                }

                catch (Exception ex)
                {
                    throw ex;
                }
                finally
                {
                    if (connect.State == ConnectionState.Open)
                        connect.Close();
                }
            }
        }

        /// <summary>
        /// Executes the dataset.
        /// </summary>
        /// <param name="ds">The dataset return.</param>
        /// <param name="CommadType">Type of the commad, if CommandType maybe is StoredProcedure or SQL command or somethings.</param>
        /// <param name="CommandText">The command text.</param>
        /// <param name="paras">The parameter.</param>
        public static void ExecuteDataset(ref DataSet ds, CommandType CommadType, string CommandText, params object[] paras)
        {
            SqlDatabase _dt = new SqlDatabase(sConnectionString);

            using (DbConnection connect = _dt.CreateConnection())
            {
                try
                {
                    if (connect.State == ConnectionState.Closed)
                        connect.Open();
                    if (connect.State == ConnectionState.Open)
                    {
                        if (CommadType == CommandType.StoredProcedure)
                        {
                            ds = _dt.ExecuteDataSet(CommandText, paras);
                        }
                        else
                            ds = _dt.ExecuteDataSet(CommadType, CommandText);

                        connect.Close();
                    }
                }
                catch (Exception ex)
                {
                    throw ex;
                }
                finally
                {
                    if (connect.State == ConnectionState.Open)
                        connect.Close();
                }
            }
        }

        /// <summary>
        /// Executes the dataset output paramter.
        /// </summary>
        /// <param name="ds">The dataset return.</param>
        /// <param name="store">The store procedure.</param>
        /// <param name="Paras">The parameter, Output value to parameter has ParameterDirection attribute is Output.</param>
        public static void ExecuteDatasetOut(ref DataSet ds, string store, params object[] Paras)
        {
            Database db = new SqlDatabase(sConnectionString);

            using (DbConnection connect = db.CreateConnection())
            {
                if (connect.State == ConnectionState.Closed)
                    connect.Open();
                if (connect.State == ConnectionState.Open)
                {
                    try
                    {
                        DbCommand cmd = db.GetStoredProcCommand(store);
                        if (Paras != null)
                            foreach (object ob in Paras)
                            {
                                SqlParameter P = (SqlParameter)ob;
                                //In
                                if (P.Direction == ParameterDirection.Input)
                                {
                                    db.AddInParameter(cmd, P.ParameterName, P.DbType, P.Value);
                                }
                                //Out
                                else if (P.Direction == ParameterDirection.Output)
                                {
                                    db.AddOutParameter(cmd, P.ParameterName, P.DbType, 255);
                                }
                                //Default
                                else
                                {
                                    db.AddInParameter(cmd, P.ParameterName, P.DbType, P.Value);
                                }
                            }
                        //execute                        
                        ds = db.ExecuteDataSet(cmd);
                        //Output
                        if (Paras != null)
                            foreach (object ob in Paras)
                            {
                                SqlParameter P = (SqlParameter)ob;
                                if (P.Direction == ParameterDirection.Output)
                                {
                                    P.Value = db.GetParameterValue(cmd, P.ParameterName.ToString().StartsWith("@") ? P.ParameterName : ("@" + P.ParameterName)).ToString();
                                }
                            }
                        connect.Close();
                    }
                    catch (Exception ex)
                    {
                        throw ex;
                    }
                    finally
                    {
                        if (connect.State == ConnectionState.Open)
                            connect.Close();
                    }
                }
            }
        }

        /// <summary>
        /// Executes the dataset output paramter.
        /// </summary>
        /// <param name="ds">The dataset return</param>
        /// <param name="store">The store procedure.</param>
        /// <param name="InputParas">The input parameter must follow a rule object(InputParameterName, DbType, InputParameterValues)</param>
        /// <param name="OutputParas">The output parameter must follow a rule object(OutputParameterName, DbType, OutputLengh)</param>
        /// <returns></returns>
        public static void ExecuteDatasetOut(ref DataSet ds, string store, object[] InputParas, object[] OutputParas)
        {
            Database db = new SqlDatabase(sConnectionString);

            using (DbConnection connect = db.CreateConnection())
            {
                if (connect.State == ConnectionState.Closed)
                    connect.Open();
                if (connect.State == ConnectionState.Open)
                {
                    try
                    {
                        DbCommand cmd = db.GetStoredProcCommand(store);
                        //In     
                        if (InputParas != null)
                            for (int i = 0; i < InputParas.Length; ++i)
                            {
                                db.AddInParameter(cmd, InputParas[i].ToString(), (DbType)InputParas[++i], InputParas[++i]);
                            }
                        //Out            
                        if (OutputParas != null)
                            for (int j = 0; j < OutputParas.Length; ++j)
                            {
                                db.AddOutParameter(cmd, OutputParas[j].ToString(), (DbType)OutputParas[++j], (Int32)OutputParas[++j]);
                            }
                        //execute                       
                        ds = db.ExecuteDataSet(cmd);
                        //output values                
                        if (OutputParas != null)
                            for (int k = 0; k < OutputParas.Length; k += 3)
                            {
                                OutputParas.SetValue(db.GetParameterValue(cmd, OutputParas[k].ToString().StartsWith("@") ? OutputParas[k].ToString() : ("@" + OutputParas[k].ToString())), k);
                            }
                        connect.Close();
                    }
                    catch (Exception)
                    {
                        if (connect.State == ConnectionState.Open)
                            connect.Close();
                    }
                    finally
                    {
                        if (connect.State == ConnectionState.Open)
                            connect.Close();
                    }
                }
            }
        }

        #endregion
        #region EXECUTENONQUERY

        /// <summary>
        /// Executes the non query.
        /// </summary>
        /// <param name="store">The store procedure.</param>
        /// <param name="paras">The parameter.</param>
        /// <returns></returns>
        public static int ExecuteNonQuery(string store, params object[] paras)
        {
            SqlDatabase _dt = new SqlDatabase(sConnectionString);
            int _iResult = -1;
            using (DbConnection connect = _dt.CreateConnection())
            {
                try
                {
                    if (connect.State == ConnectionState.Closed)
                        connect.Open();
                    if (connect.State == ConnectionState.Open)
                    {
                        _iResult = _dt.ExecuteNonQuery(store, paras);
                    }
                }
                catch (Exception ex)
                {

                    throw ex;
                }
                finally
                {
                    if (connect.State == ConnectionState.Open)
                        connect.Close();
                }
            }
            return _iResult;
        }

        /// <summary>
        /// Executes the non query.
        /// </summary>
        /// <param name="comType">Type of the Command Type.</param>
        /// <param name="comText">The Command text.</param>
        /// <returns></returns>
        public static int ExecuteNonQuery(CommandType comType, string comText)
        {
            SqlDatabase _dt = new SqlDatabase(sConnectionString);
            int _iResult = -1;
            using (DbConnection connect = _dt.CreateConnection())
            {
                try
                {
                    if (connect.State == ConnectionState.Closed)
                        connect.Open();
                    if (connect.State == ConnectionState.Open)
                    {
                        _iResult = _dt.ExecuteNonQuery(comType, comText);
                    }
                }
                catch (Exception ex)
                {
                    throw ex;
                }
                finally
                {
                    if (connect.State == ConnectionState.Open)
                        connect.Close();
                }
            }
            return _iResult;
        }

        #endregion
        #region EXECUTESCALA
        /// <summary>
        /// Executes the non query.
        /// </summary>
        /// <param name="store">The store procedure.</param>
        /// <param name="paras">The parameter.</param>
        /// <returns></returns>
        public static object ExecuteScala(string store, params object[] paras)
        {
            SqlDatabase _dt = new SqlDatabase(sConnectionString);
            object _iResult = -1;
            using (DbConnection connect = _dt.CreateConnection())
            {
                try
                {
                    if (connect.State == ConnectionState.Closed)
                        connect.Open();
                    if (connect.State == ConnectionState.Open)
                    {
                        _iResult = _dt.ExecuteScalar(store, paras);
                    }
                }
                catch (Exception ex)
                {
                    throw ex;
                }
                finally
                {
                    if (connect.State == ConnectionState.Open)
                        connect.Close();
                }
            }
            return _iResult;
        }
        #endregion
        #region EXECUTEREDER
        /// <summary>
        /// Executes the REDER
        /// </summary>
        /// <param name="store">The store procedure.</param>
        /// <param name="paras">The parameter.</param>
        /// <returns></returns>
        public static IDataReader ExecuteReader(string store, params object[] paras)
        {
            SqlDatabase _dt = new SqlDatabase(sConnectionString);
            IDataReader _iResult = null;
            using (DbConnection connect = _dt.CreateConnection())
            {
                try
                {
                    if (connect.State == ConnectionState.Closed)
                        connect.Open();
                    if (connect.State == ConnectionState.Open)
                    {
                        _iResult = _dt.ExecuteReader(store, paras);

                    }
                }
                catch (Exception ex)
                {
                    throw ex;
                }
                finally
                {
                    if (connect.State == ConnectionState.Open)
                        connect.Close();
                }
            }
            return _iResult;
        }
        #endregion

    }
}
