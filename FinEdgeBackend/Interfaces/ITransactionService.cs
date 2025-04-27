using FinEdgeBackend.DTOs.Transactions;
using FinEdgeBackend.Models;

namespace FinEdgeBackend.Interfaces
{
    public interface ITransactionService
    {
        Task CreateTransactionAsync(Transaction transaction);
        Task<Transaction> GetTransactionByIdAsync(int transactionID);
        Task<ICollection<Transaction>> GetAllTransactionsAsync(User currentUser);
        Task<ICollection<Transaction>> GetAllExpenditureTransactionsAsync(User currentUser);
        Task<ICollection<Transaction>> GetAllIncomeTransactionsAsync(User currentUser);
        ICollection<Transaction> GetTransactionsFromSpecifiedDate(ICollection<Transaction> transactions, DateTime date);
        TransactionSankeyChartDTO GetSankeyChartDataAsync(ICollection<Category> categories);
        Task UpdateTranssactionAsync(TransactionDTO transactioDto, Transaction transaction, Category category, Account account, Account originalAccount, User currentUser);
        Task UpdateUserBalanceAsync(bool isNewTransaction, TransactionDTO? transactioDto, Transaction? transaction, User currentUser, Category category, Account account);
        Task DeleteTransactionAsync(Transaction transaction);
        decimal GetDailyBalanceForTransactions(ICollection<Transaction> transactions);
        (decimal weeklyBalance, decimal weeklyAverage) GetWeeklyBalanceForTransactions(ICollection<Transaction> transactions);
        (decimal monthBalance, decimal monthAverage) GetMontlyBalanceForTransactions(ICollection<Transaction> transactions);
        bool Validate(TransactionDTO transactionDto);
    }
}
