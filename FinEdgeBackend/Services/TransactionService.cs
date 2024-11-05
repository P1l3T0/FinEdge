using FinEdgeBackend.Data;
using FinEdgeBackend.DTOs;
using FinEdgeBackend.Interfaces;
using FinEdgeBackend.Models;
using Microsoft.EntityFrameworkCore;

namespace FinEdgeBackend.Services
{
    public class TransactionService(DataContext dataContext, IAccountService accountService, ICategoryService categoryService) : ITransactionService
    {
        private readonly DataContext _dataContext = dataContext;
        private readonly IAccountService _accountService = accountService;
        private readonly ICategoryService _categoryService = categoryService;

        public async Task CreateTransactionAsync(Transaction transaction)
        {
            _dataContext.Transactions.Add(transaction);
            await _dataContext.SaveChangesAsync();
        }

        public async Task<Transaction> GetTransactionByIdAsync(int transactionID)
        {
            Transaction? transaction = await _dataContext.Transactions.FirstOrDefaultAsync(t => t.ID == transactionID);
            return transaction!;
        }

        public async Task<ICollection<Transaction>> GetAllTransactionsAsync(User currentUser)
        {
            return await _dataContext.Transactions.Where(t => t.User == currentUser).ToListAsync();
        }

        public async Task<ICollection<Transaction>> GetAllExpenditureTransactionsAsync(User currentUser)
        {
            return await _dataContext.Transactions.Where(t => t.Category!.IsIncome == false && t.User == currentUser).ToListAsync();
        }

        public async Task<ICollection<Transaction>> GetAllIncomeTransactionsAsync(User currentUser)
        {
            return await _dataContext.Transactions.Where(t => t.Category!.IsIncome == true && t.User == currentUser).ToListAsync();
        }

        public async Task<ICollection<Transaction>> GetAllTransactionsForAccountAsync(Account account)
        {
            return await _dataContext.Transactions.Where(t => t.Account == account).ToListAsync();
        }

        public async Task<ICollection<Transaction>> GetAllTransactionsForCategoryAsync(Category category)
        {
            return await _dataContext.Transactions.Where(t => t.Category == category).ToListAsync();
        }

        public async Task UpdateTranssactionAsync(TransactionDTO transactioDto, Transaction transaction, Category category, Account account)
        {
            transaction.Name = transactioDto.Name;
            transaction.Amount = transactioDto.Amount;
            transaction.AccountID = account.ID;
            transaction.Account = account;
            transaction.CategoryID = category.ID;
            transaction.Category = category;

            _dataContext.Transactions.Update(transaction);
            await _dataContext.SaveChangesAsync();
        }

        public async Task DeleteTransactionAsync(Transaction transaction)
        {
            _dataContext.Transactions.Remove(transaction);
            await _dataContext.SaveChangesAsync();
        }

        public bool Validate(TransactionDTO transactionDto)
        {
            if (decimal.IsNegative((decimal)transactionDto.Amount!) || !transactionDto.Amount.HasValue || 
                string.IsNullOrEmpty(transactionDto.Name) || string.IsNullOrEmpty(transactionDto.AccountName) || string.IsNullOrEmpty(transactionDto.CategoryName)) 
            {
                return false;
            }

            return true;
        }
    }
}
