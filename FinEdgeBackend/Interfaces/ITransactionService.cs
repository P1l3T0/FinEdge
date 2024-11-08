using FinEdgeBackend.DTOs;
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
        Task<ICollection<Transaction>> GetAllTransactionsForCategoryAsync(Category category);
        Task<ICollection<Transaction>> GetAllTransactionsForAccountAsync(Account account);
        Task UpdateTranssactionAsync(TransactionDTO transactioDto, Transaction transaction, Category category, Account account);
        Task UpdateUserBalanceAsync(bool isNewTransaction, TransactionDTO? transactioDto, Transaction? transaction, User currentUser, Category category, Account account);
        Task DeleteTransactionAsync(Transaction transaction);
        bool Validate(TransactionDTO transactionDto);
    }
}
